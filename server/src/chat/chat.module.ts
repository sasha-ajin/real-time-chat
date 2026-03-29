import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ThreadsModule } from '../threads/threads.module';
import { MessagesModule } from '../messages/messages.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [AuthModule, ThreadsModule, MessagesModule],
  providers: [ChatGateway],
})
export class ChatModule {}
