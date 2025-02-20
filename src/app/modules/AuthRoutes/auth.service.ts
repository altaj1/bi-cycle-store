/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';

import config from '../../config';
import { TUser } from '../user/user.interface';
import User from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import { ObjectId } from 'mongoose';

const registerUserIntoDb = async (payload: TUser) => {
  // console.log(payload);
  try {
    const user = await User.create(payload);
    console.log({ user });
    return user;
  } catch (error) {
    console.log(error);
    console.log("'A user with this ID or email already exists.'");
  }
};
const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload.email);
  console.log(user, 'db user');

  if (!user) {
    throw new Error('Invalid credentials');
  }
  const isDeleted = user?.isDeleted;
  const isBlocked = user?.isBlocked;

  if (isDeleted) {
    throw new Error('This user is deleted !');
  }
  if (isBlocked) {
    throw new Error('This user is blocked ! !');
  }
  if (
    !(await User.isPasswordMatched(payload?.password, user?.password as string))
  )
    throw new Error('Invalid credentials');
  if (user.role !== 'admin' && user.role !== 'user') {
    throw new Error('Invalid role');
  }
  const jwtPayload: {
    email: string;
    role: 'admin' | 'user';
    _id: ObjectId;
    name: string;
  } = {
    email: user.email,
    role: user.role,
    _id: user._id as ObjectId,
    name: user.name,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  return accessToken;
};
export const AuthServices = {
  registerUserIntoDb,
  loginUser,
};
