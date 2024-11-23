import { TOrder } from './order.interface';
import { OrderModel } from './order.models';

const createOrederIntoDB = async (orderData: TOrder) => {
  const result = await OrderModel.create(orderData);
  return result;
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
    console.log(result);
    return { totalRevenue };
  } catch (error) {
    console.error(error);
    throw new Error('Error calculating revenue');
  }
};

export const OrderService = {
  createOrederIntoDB,
  getOrdersRevenueFromBD,
};
