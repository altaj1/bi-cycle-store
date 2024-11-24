/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { BicycleValidationSchema } from './bicycle.ValidationSchema';
import { BicycleService } from './bicycle.service';

const createBicycle = async (req: Request, res: Response) => {
  try {
    const bicycleData = req.body;
    // console.log(bicycleData);
    const zodParedData =
      BicycleValidationSchema.VbicycleValidationSchema.parse(bicycleData);
    const result = await BicycleService.createBicycleIntoDB(zodParedData);
    res.status(200).json({
      success: true,
      message: 'Bicycle is create successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Validation failed',
      error: err,
    });
  }
};

const getAllBicycle = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const result = await BicycleService.getAllBicycleFromDB(searchTerm);
    res.status(200).json({
      success: true,
      message: 'Bicycle is retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message:
        error.message || 'Failed to retrieve bicycles. Please try again later.',
      error: error.message || 'Internal Server Error',
    });
  }
};

const getSingleBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await BicycleService.getSingleBicycleIntoDB(productId);
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

const updateSingleBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const updates = req.body;
    const result = await BicycleService.updateSingleBicycleIntoDB(
      productId,
      updates,
    );
    res.status(200).json({
      success: true,
      message: 'Bicycle is update succesfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message:
        error.message || 'Failed to update bicycles. Please try again later.',
      error: error || 'Internal Server Error',
    });
  }
};
const deleteSingleBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await BicycleService.deleteSingleBicycleIntoDB(productId);
    res.status(200).json({
      status: true,
      message: 'Bicycle deleted successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message:
        error.message || 'Failed to delete bicycles. Please try again later.',
      error: error || 'Internal Server Error',
    });
  }
};
export const BicycleControllers = {
  createBicycle,
  getAllBicycle,
  getSingleBicycle,
  updateSingleBicycle,
  deleteSingleBicycle,
};
