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
import { ThreadsService } from '../threads/threads.service';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private threadsService: ThreadsService,
    private messagesService: MessagesService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token =
        client.handshake.auth?.token ||
        client.handshake.headers?.authorization?.split(' ')[1];

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = await this.jwtService.verifyAsync(token);

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
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { threadId: string },
  ) {
    const thread = await this.threadsService.findById(data.threadId);

    if (
      !thread ||
      !this.threadsService.isParticipant(thread, client.data.userId)
    ) {
      client.emit('error', { message: 'Access denied' });
      return;
    }

    client.join(data.threadId);
  }

  @SubscribeMessage('leaveThread')
  async handleLeaveThread(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { threadId: string },
  ) {
    client.leave(data.threadId);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { threadId: string; text: string },
  ) {
    if (!data.text?.trim()) {
      client.emit('error', { message: 'Message text is required' });
      return;
    }

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
      senderId: message.senderId,
      text: message.text,
      createdAt: message.createdAt,
    });
  }
}
