import { TbiCycle } from './biCycle.interface';
import { BicycleModel } from './biCycle.models';

const createBicycleIntoDB = async (bicycleData: TbiCycle) => {
  const result = await BicycleModel.create(bicycleData);
  return result;
};

export const bicycleService = {
  createBicycleIntoDB,
};
