import mongoose from 'mongoose';
import User from './user.model';

const getAllUserDB = async () => {
  // Perform the database query
  const result = await User.find({
    isDeleted: false,
  });
  return result;
};

const getSingleUserDB = async (id: string) => {
  // Perform the database query
  const result = await User.findOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};

const deleteUserDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const toggleBlockUserDB = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');

  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: !user.isBlocked },
    { new: true },
  );
  return result;
};
export const UserService = {
  getAllUserDB,
  getSingleUserDB,
  deleteUserDB,
  toggleBlockUserDB,
};
