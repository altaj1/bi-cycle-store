/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import OrderValidationSchema from './order.ValidationSchema';
import { OrderService } from './order.service';
import { BicycleModel } from '../biCycle/biCycle.models';

const createOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const orderData = req.body;

    const zodParsedData = OrderValidationSchema.parse(orderData);

    const bicycle = await BicycleModel.findById(zodParsedData.product);
    if (!bicycle) {
      return res.status(404).json({
        success: false,
        message: 'Bicycle not found.',
      });
    }

    if (bicycle.quantity < zodParsedData.quantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient stock available.',
      });
    }

    bicycle.quantity -= zodParsedData.quantity;
    bicycle.inStock = bicycle.quantity > 0;

    await bicycle.save();

    const result = await OrderService.createOrederIntoDB(zodParsedData);

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    console.error('Error creating order:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
    });
  }
};

const getOrderRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getOrdersRevenueFromBD();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error.message || 'Failed to retrieve revenue. Please try again later.',
      error: error.message || 'Internal Server Error',
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrderRevenue,
};
