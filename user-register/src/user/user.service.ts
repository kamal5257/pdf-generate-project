import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IUser } from 'src/interface/user.interface';
import { UpdateUserDto } from './update-user.dto';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  find() {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async getAllUsers(): Promise<IUser[]> {
    const users = await this.userModel.find();
    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    const existUser = await this.userModel
      .findOneAndUpdate(
        { _id: new mongoose.mongo.ObjectId(updateUserDto.id) },
        updateUserDto,
        { new: true },
      )
      .exec();
    if (!existUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    console.log(existUser);
    return existUser;
  }

  async deleteUser(userId: string): Promise<any> {
    const existUser = await this.userModel.findOne({
      _id: new mongoose.mongo.ObjectId(userId),
    });
    console.log('DELLL ', new mongoose.mongo.ObjectId(userId));
    await this.userModel.findOneAndDelete({
      _id: new mongoose.mongo.ObjectId(userId),
    });
    if (!existUser) {
      throw new NotFoundException('Record not found');
    }
    return null;
  }
}
