import { TOrder } from './order.interface';
import { OrderModel } from './order.models';

const createOrederIntoDB = async (orderData: TOrder) => {
  try {
    const result = await OrderModel.create(orderData);
    return result;
  } catch (error) {
    console.error('Error creating order in the database:', error);
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
          _id: null, // Group all the orders
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);

    const totalRevenue = result[0]?.totalRevenue || 0;
    return { totalRevenue };
  } catch (error) {
    console.error(error);
  }
};

export const OrderService = {
  createOrederIntoDB,
  getOrdersRevenueFromBD,
};
