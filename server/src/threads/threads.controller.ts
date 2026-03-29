import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';

@Controller('threads')
@UseGuards(AuthGuard)
export class ThreadsController {
  constructor(private threadsService: ThreadsService) {}

  @Get()
  async getThreads(@Request() req: AuthenticatedRequest) {
    return this.threadsService.findByUser(req.user.sub);
  }

  @Post()
  async createThread(
    @Request() req: AuthenticatedRequest,
    @Body() dto: CreateThreadDto,
  ) {
    if (req.user.sub === dto.participantId) {
      throw new BadRequestException('Cannot create a chat with yourself');
    }
    return this.threadsService.findOrCreate(req.user.sub, dto.participantId);
  }
}
