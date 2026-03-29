import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Thread, ThreadSchema } from './thread.schema';
import { ThreadsController } from './threads.controller';
import { ThreadsService } from './threads.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Thread.name, schema: ThreadSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ThreadsController],
  providers: [ThreadsService],
  exports: [ThreadsService],
})
export class ThreadsModule {}
