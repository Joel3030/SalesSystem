import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User does not exist');
    return user;
  }

  async createUser(req: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(req);
    return await newUser.save();
  }

  async updateUser(id: string, req: CreateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, req, {
      new: true,
    });
    if (!updatedUser) throw new NotFoundException('User does not exist');
    return updatedUser;
  }

  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) throw new NotFoundException('User does not exist');
    return deletedUser;
  }
}
