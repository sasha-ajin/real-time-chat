import { ConflictException, Injectable } from '@nestjs/common';
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

  async searchByUserName(userName?: string): Promise<UserDocument[]> {
    const filter = userName
      ? { username: { $regex: escapeRegex(userName), $options: 'i' } }
      : {};

    return this.userModel.find(filter).select('username email').exec();
  }

  async create(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<UserDocument> {
    try {
      return await this.userModel.create(userData);
    } catch (error: any) {
      if (error?.code === 11000) {
        const field = error.keyPattern
          ? Object.keys(error.keyPattern as Record<string, unknown>)[0]
          : undefined;
        throw new ConflictException(
          field ? `${field} already exists` : 'Duplicate value',
        );
      }
      throw error;
    }
  }
}
