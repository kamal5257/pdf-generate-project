import { Document } from 'mongoose';
export interface IUser extends Document {
  name: string;
  email: number;
  mobileNo: number;
  address: string;
}
