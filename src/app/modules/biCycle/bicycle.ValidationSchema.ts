import { z } from 'zod';
import { ETcycletype } from './biCycle.interface';
const VbicycleTypeValidationSchema = z.enum([
  ETcycletype.Mountain,
  ETcycletype.Road,
  ETcycletype.Hybrid,
  ETcycletype.BMX,
  ETcycletype.Electric,
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
