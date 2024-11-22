import { TbiCycle } from './biCycle.interface';
import { BicycleModel } from './biCycle.models';

const createBicycleIntoDB = async (bicycleData: TbiCycle) => {
  const result = await BicycleModel.create(bicycleData);
  return result;
};

const getAllBicycleFromDB = async () => {
  const result = await BicycleModel.find();
  return result;
};
export const BicycleService = {
  createBicycleIntoDB,
  getAllBicycleFromDB,
};
