import { model, Schema } from 'mongoose';
import { ETcycletype, TbiCycle } from './biCycle.interface';

const bicycleSchema = new Schema<TbiCycle>(
  {
    name: { type: String, required: [true, 'Bicycle name is required'] },
    brand: { type: String, required: [true, 'Brand is required'] },
    price: {
      type: Number,
      required: true,
      min: [0, 'Quantity cannot be negative'],
    },
    type: {
      type: String,
      enum: ETcycletype,
      required: true,
    },
    description: { type: String, required: [true, 'Descriotuion is required'] },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity cannot be negative'],
    },
    inStock: { type: Boolean, required: true, default: true },
    model: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: String, required: true },
  },
  { timestamps: true },
);

export const BicycleModel = model<TbiCycle>('Bicycle', bicycleSchema);
