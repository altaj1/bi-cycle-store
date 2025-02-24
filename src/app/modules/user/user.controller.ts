/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserService } from './user.service';

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUserDB();
    res.status(200).json({
      success: true,
      message: 'User is retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message:
        error.message || 'Failed to retrieve Users. Please try again later.',
      error: error.message || 'Internal Server Error',
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getAllUserDB(userId);
    res.status(200).json({
      success: true,
      message: 'Bicycle is retrieve succesfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message:
        error.message || 'Failed to retrieve bicycles. Please try again later.',
      error: error || 'Internal Server Error',
    });
  }
};
const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const result = await UserService.deleteUserDB(id);
    if (!result) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
      error: error || 'Internal Server Error',
    });
  }
};

const toggleBlockUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const result = await UserService.toggleBlockUserDB(id);
    if (!result) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({
      success: true,
      message: `User ${result.isBlocked ? 'blocked' : 'unblocked'} successfully`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
export const UserControllers = {
  getAllUser,
  getSingleUser,
  deleteUser,
  toggleBlockUser,
};
