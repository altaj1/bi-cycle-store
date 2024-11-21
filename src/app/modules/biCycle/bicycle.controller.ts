import { Request, Response } from 'express';

const createBicycle = async (req: Request, res: Response) => {
  try {
    const { bicycle: bicycleData } = req.body;
    console.log(bicycleData);
  } catch (error) {
    console.log(error);
  }
};
export const BicycleControllers = {
  createBicycle,
};
