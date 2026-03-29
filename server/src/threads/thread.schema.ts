import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ThreadDocument = HydratedDocument<Thread>;

@Schema({ _id: false })
export class LastMessage {
  @Prop({ required: true })
  text: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  senderId: Types.ObjectId;

  @Prop({ required: true })
  createdAt: Date;
}

@Schema({ timestamps: true })
export class Thread {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  participants: Types.ObjectId[];

  @Prop({ type: LastMessage, default: null })
  lastMessage: LastMessage | null;
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);

ThreadSchema.index({ participants: 1 });
