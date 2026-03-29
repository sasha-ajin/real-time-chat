import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(username: string): Promise<UserDocument | null> {
    return this.userModel
      .findOne({ username })
      .select('username password')
      .exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async searchByUserName(userName: string): Promise<UserDocument[]> {
    const safeUserName = escapeRegex(userName);

    return this.userModel
      .find({ username: { $regex: safeUserName, $options: 'i' } })
      .select('username email')
      .limit(20)
      .exec();
  }

  async create(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<UserDocument> {
    return this.userModel.create(userData);
  }
}
