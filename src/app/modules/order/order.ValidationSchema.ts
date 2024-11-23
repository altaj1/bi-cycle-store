import { z } from 'zod';
const OrderValidationSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),

  product: z.string().nonempty('Product ID is required'),

  quantity: z
    .number()
    .int('Quantity must be a non-negative integer')
    .positive('Quantity must be a positive integer')
    .min(1, 'Quantity must be at least 1'),

  totalPrice: z
    .number()
    .positive('Total price must be a positive number')
    .min(1, 'Total price must be at least 1'),
});

export default OrderValidationSchema;
