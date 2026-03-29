import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';

@Controller('threads')
@UseGuards(AuthGuard)
export class ThreadsController {
  constructor(private threadsService: ThreadsService) {}

  @Get()
  async getThreads(@Request() req: any) {
    return this.threadsService.findByUser(req.user.sub);
  }

  @Post()
  async createThread(@Request() req: any, @Body() dto: CreateThreadDto) {
    return this.threadsService.findOrCreate(req.user.sub, dto.participantId);
  }
}
