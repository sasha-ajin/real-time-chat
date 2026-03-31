import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
} from '../common/constants/validation.constants';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, maxlength: USERNAME_MAX_LENGTH, unique: true })
  username: string;

  @Prop({ required: true, maxlength: EMAIL_MAX_LENGTH, unique: true })
  email: string;

  @Prop({ required: true, maxLength: PASSWORD_MAX_LENGTH })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
