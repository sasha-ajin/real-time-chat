import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Thread, ThreadDocument } from './thread.schema';

@Injectable()
export class ThreadsService {
  constructor(@InjectModel(Thread.name) private threadModel: Model<Thread>) {}

  async findByUser(userId: string): Promise<ThreadDocument[]> {
    return this.threadModel
      .find({ participants: new Types.ObjectId(userId) })
      .populate('participants', 'username')
      .sort({ updatedAt: -1 })
      .exec();
  }

  async findById(threadId: string): Promise<ThreadDocument | null> {
    return this.threadModel
      .findById(threadId)
      .populate('participants', 'username')
      .exec();
  }

  async findOrCreate(userA: string, userB: string): Promise<ThreadDocument> {
    const participantIds = [
      new Types.ObjectId(userA),
      new Types.ObjectId(userB),
    ];

    const existing = await this.threadModel
      .findOne({ participants: { $all: participantIds } })
      .populate('participants', 'username')
      .exec();

    if (existing) {
      return existing;
    }

    const thread = await this.threadModel.create({
      participants: participantIds,
    });

    return thread.populate('participants', 'username');
  }

  async updateLastMessage(
    threadId: string,
    message: { text: string; senderId: string; createdAt: Date },
  ): Promise<void> {
    await this.threadModel.findByIdAndUpdate(threadId, {
      lastMessage: {
        text: message.text,
        senderId: new Types.ObjectId(message.senderId),
        createdAt: message.createdAt,
      },
    });
  }

  isParticipant(thread: ThreadDocument, userId: string): boolean {
    return thread.participants.some(
      (p: any) => (p._id ?? p).toString() === userId,
    );
  }
}
