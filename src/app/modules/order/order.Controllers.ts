/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import OrderValidationSchema from './order.ValidationSchema';
import { OrderService } from './order.service';
import { BicycleModel } from '../biCycle/biCycle.models';
import { OrderModel } from './order.models';

const createrOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParedData = OrderValidationSchema.parse(orderData);

    const bicycle = await BicycleModel.findById(zodParedData.product);

    if (!bicycle) {
      return res.status(404).json({
        success: false,
        message: 'Bicycle not found.',
      });
    }

    if (bicycle.quantity < zodParedData.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock available.',
      });
    }

    bicycle.quantity -= zodParedData.quantity;

    if (bicycle.quantity === 0) {
      bicycle.inStock = false;
    }

    await bicycle.save();
    const result = await OrderService.createOrederIntoDB(zodParedData);
    return res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getOrderRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getOrdersRevenueFromBD();
    return res.status(200).json({
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
  createrOrder,
  getOrderRevenue,
};
