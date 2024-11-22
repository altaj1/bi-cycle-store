import { z } from 'zod';
const VbicycleTypeValidationSchema = z.enum([
  'Mountain',
  'Road',
  'Hybrid',
  'BMX',
  'Electric',
]);

const VbicycleValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  brand: z.string().min(1, 'Brand is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  type: VbicycleTypeValidationSchema,
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().int().min(0, 'Quantity must be a non-negative integer'),
  inStock: z.boolean(),
});

export const BicycleValidationSchema = {
  VbicycleValidationSchema,
};
