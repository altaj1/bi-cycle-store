/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TbiCycle } from './biCycle.interface';
import { BicycleModel } from './biCycle.models';

const createBicycleIntoDB = async (bicycleData: TbiCycle) => {
  const result = await BicycleModel.create(bicycleData);
  return result;
};

const getAllBicycleFromDB = async (searchTerm?: string) => {
  const query: any = {};

  if (
    searchTerm &&
    typeof searchTerm === 'string' &&
    searchTerm.trim().length > 0
  ) {
    query.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { brand: { $regex: searchTerm, $options: 'i' } },
      { type: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  // Perform the database query
  const result = await BicycleModel.find(query);
  return result;
};

const getSingleBicycleIntoDB = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }
  const result = await BicycleModel.findOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};
const updateSingleBicycleIntoDB = async (id: string, updates: any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }
  const result = await BicycleModel.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(id),
    },
    { ...updates },
  );
  return result;
};
const deleteSingleBicycleIntoDB = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }
  const result = await BicycleModel.findByIdAndDelete({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};

export const BicycleService = {
  createBicycleIntoDB,
  getAllBicycleFromDB,
  getSingleBicycleIntoDB,
  updateSingleBicycleIntoDB,
  deleteSingleBicycleIntoDB,
};
