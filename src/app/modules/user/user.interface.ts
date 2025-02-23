/* eslint-disable no-unused-vars */
import { Model, ObjectId } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
  isBlocked?: boolean;
  isDeleted?: boolean;
}
export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser | null>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  // isJWTIssuedBeforePasswordChanged(
  //   passwordChangedTimestamp: Date,
  //   jwtIssuedTimestamp: number,
  // ): boolean;
}
export type TUserRole = keyof typeof USER_ROLE;
