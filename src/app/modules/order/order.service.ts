import { TOrder } from './order.interface';
import { OrderModel } from './order.models';

const createOrederIntoDB = async (orderData: TOrder) => {
  const result = await OrderModel.create(orderData);
  return result;
};

export const OrderService = {
  createOrederIntoDB,
};
