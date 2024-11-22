import { Request, Response } from 'express';
import { BicycleValidationSchema } from './bicycle.ValidationSchema';
import { BicycleService } from './bicycle.service';

const createBicycle = async (req: Request, res: Response) => {
  try {
    const { bicycle: bicycleData } = req.body;
    // console.log(bicycleData);
    const zodParedData =
      BicycleValidationSchema.VbicycleValidationSchema.parse(bicycleData);
    console.log(zodParedData, 'This is zod data');
    const result = await BicycleService.createBicycleIntoDB(zodParedData);
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err: any) {
    if (err.errors) {
      // Build detailed validation errors structure
      const validationErrors = err.errors.reduce((acc: any, curr: any) => {
        acc[curr.path[0]] = {
          message: curr.message,
          name: 'ValidatorError',
          properties: {
            message: curr.message,
            type: curr.code,
          },
          kind: curr.code,
          path: curr.path[0],
          value: curr.value || req.body?.[curr.path[0]], // Include the invalid value
        };
        return acc;
      }, {});

      return res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
          name: 'ValidationError',
          errors: validationErrors,
        },
        stack: err.stack, // Include stack trace for debugging
      });
    }

    // Generic error handler for other types of errors
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        name: err.name || 'ServerError',
        message: err.message || 'An unexpected error occurred',
      },
      stack: err.stack, // Include stack trace for debugging
    });
  }
};

const getAllBicycle = async (req: Request, res: Response) => {
  try {
    const result = await BicycleService.getAllBicycleFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved succesfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bicycles. Please try again later.',
      error: error.message || 'Internal Server Error',
    });
  }
};
export const BicycleControllers = {
  createBicycle,
  getAllBicycle,
};
