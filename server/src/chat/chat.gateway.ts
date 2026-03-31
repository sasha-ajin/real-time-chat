import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { ThreadsService } from '../threads/threads.service';
import { MessagesService } from '../messages/messages.service';
import { ThreadIdDto } from './dto/thread-id.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { WsValidationPipe } from './pipes/ws-validation.pipe';

interface AuthenticatedSocketData {
  userId: string;
  username: string;
}

interface AuthenticatedSocket extends Socket {
  data: AuthenticatedSocketData;
}

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL ?? 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private threadsService: ThreadsService,
    private messagesService: MessagesService,
  ) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const token: string | undefined =
        (client.handshake.auth?.token as string) ||
        client.handshake.headers?.authorization?.split(' ')[1];

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

      if (this.authService.isTokenBlacklisted(token)) {
        client.disconnect();
        return;
      }

      client.data.userId = payload.sub;
      client.data.username = payload.username;
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect() {}

  @SubscribeMessage('joinThread')
  async handleJoinThread(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new WsValidationPipe()) data: ThreadIdDto,
  ) {
    const thread = await this.threadsService.findById(data.threadId);

    if (
      !thread ||
      !this.threadsService.isParticipant(thread, client.data.userId)
    ) {
      client.emit('error', { message: 'Access denied' });
      return;
    }

    await client.join(data.threadId);
  }

  @SubscribeMessage('leaveThread')
  async handleLeaveThread(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new WsValidationPipe()) data: ThreadIdDto,
  ) {
    await client.leave(data.threadId);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new WsValidationPipe()) data: SendMessageDto,
  ) {
    const thread = await this.threadsService.findById(data.threadId);

    if (
      !thread ||
      !this.threadsService.isParticipant(thread, client.data.userId)
    ) {
      client.emit('error', { message: 'Access denied' });
      return;
    }

    const message = await this.messagesService.create(
      data.threadId,
      client.data.userId,
      data.text.trim(),
    );

    await this.threadsService.updateLastMessage(data.threadId, {
      text: message.text,
      senderId: client.data.userId,
      createdAt: message.createdAt,
    });

    this.server.to(data.threadId).emit('newMessage', {
      _id: message._id,
      threadId: message.threadId,
      senderId: {
        _id: message.senderId,
        username: client.data.username,
      },
      text: message.text,
      createdAt: message.createdAt,
    });
  }
}
