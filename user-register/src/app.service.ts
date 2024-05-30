import { Injectable } from '@nestjs/common';
import { AllUser, User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<AllUser>) {}

  getHello(): string {
    return 'Hello World!';
  }
}
