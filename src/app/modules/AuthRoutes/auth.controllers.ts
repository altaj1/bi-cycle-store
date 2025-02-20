import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import config from '../../config';
import { AuthServices } from './auth.service';
import httpStatus from 'http-status';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUserIntoDb(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: {
      email: result?.email,
      name: result?.name,
      _id: result?._id,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  res.cookie('accessToken', result, {
    secure: false,
    httpOnly: false,
    sameSite: 'lax',
    path: '/',
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: {
      token: result,
    },
  });
});

const logout = catchAsync(async (req, res) => {
  res.clearCookie('accessToken', {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
    secure: false,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logout successful',
    data: null,
  });
});
export const AuthControllers = {
  registerUser,
  login,
  logout,
};
