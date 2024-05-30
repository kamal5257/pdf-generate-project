import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  mobileNo: { type: String },
  address: { type: String },
});

// interface Address {
//   city: string;
//   state: string;
// }

export class User {
  @Prop()
  name: string;

  @Prop()
  email: number;

  @Prop()
  mobileNo: string;

  @Prop()
  address: string;
}

export interface AllUser {
  name: string;
  email: string;
  mobile: string;
  address: string;
}
