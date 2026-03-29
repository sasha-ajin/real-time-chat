import {
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { MessagesService } from './messages.service';
import { ThreadsService } from '../threads/threads.service';

@Controller('threads/:threadId/messages')
@UseGuards(AuthGuard)
export class MessagesController {
  constructor(
    private messagesService: MessagesService,
    private threadsService: ThreadsService,
  ) {}

  @Get()
  async getMessages(@Request() req: any, @Param('threadId') threadId: string) {
    const thread = await this.threadsService.findById(threadId);

    if (!thread) {
      throw new NotFoundException('Thread not found');
    }

    if (!this.threadsService.isParticipant(thread, req.user.sub)) {
      throw new ForbiddenException('Not a participant of this thread');
    }

    return this.messagesService.findByThread(threadId);
  }
}
