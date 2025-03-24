import { TOrder } from './order.interface';
import { OrderModel } from './order.models';

const createOrederIntoDB = async (orderData: TOrder) => {
  try {
    const result = await OrderModel.create(orderData);
    return result;
  } catch (error) {
    console.error('Error creating order in the database:', error);
    throw error;
  }
};

const getOrdersRevenueFromBD = async () => {
  try {
    const result = await OrderModel.aggregate([
      {
        $project: {
          totalPrice: { $multiply: ['$totalPrice', '$quantity'] },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);

    const totalRevenue = result[0]?.totalRevenue || 0;
    return { totalRevenue };
  } catch (error) {
    console.error('Error calculating revenue:', error);
    throw error;
  }
};

const getAllOrdersFromDB = async () => {
  try {
    const orders = await OrderModel.find();
    return orders;
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};
const getOrdersByUserFromDB = async (email: string) => {
  try {
    const orders = await OrderModel.find({ email: email });
    return orders;
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};

export const OrderService = {
  createOrederIntoDB,
  getOrdersRevenueFromBD,
  getAllOrdersFromDB,
  getOrdersByUserFromDB,
};
