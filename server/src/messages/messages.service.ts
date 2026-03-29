import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async findByThread(threadId: string): Promise<MessageDocument[]> {
    return this.messageModel
      .find({ threadId: new Types.ObjectId(threadId) })
      .sort({ createdAt: 1 })
      .exec();
  }

  async create(
    threadId: string,
    senderId: string,
    text: string,
  ): Promise<MessageDocument> {
    return this.messageModel.create({
      threadId: new Types.ObjectId(threadId),
      senderId: new Types.ObjectId(senderId),
      text,
    });
  }
}
