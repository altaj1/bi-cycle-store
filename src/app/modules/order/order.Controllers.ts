/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import OrderValidationSchema from './order.ValidationSchema';
import { OrderService } from './order.service';
import { BicycleModel } from '../biCycle/biCycle.models';
import Stripe from 'stripe';
const stripe = new Stripe(
  'sk_test_51PKvKvKf75RdS2ZUEeJaBjxKbIMm6mqjBNT6jIfF3lsdugu31LopYkvpZ4VtNQwAjImuejkcYJjfoFMRVU9jTFQu00FOjXmJi0',
);
console.log(process.env.STRIPE_SECRET_KEY);
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

const paymentIntent = async (req: Request, res: Response): Promise<any> => {
  try {
    const price = req.body.price;
    const priceInCent = parseFloat(price) * 100;
    console.log({ price });

    if (!price || priceInCent < 100 || priceInCent > 100000) {
      return res
        .status(400)
        .json({ error: 'Amount must be between $1 and $1000' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceInCent,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getAllOrdersFromDB();
    res.status(200).json({
      message: 'Orders fetched successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch orders',
    });
  }
};
const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getOrdersByUserFromDB(req.params.email);
    res.status(200).json({
      message: 'Orders fetched successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch orders',
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrderRevenue,
  paymentIntent,
  getAllOrders,
  getOrdersByUser,
};
