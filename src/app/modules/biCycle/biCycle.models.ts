import { model, Schema } from 'mongoose';
import { ETcycletype, TbiCycle } from './biCycle.interface';

const bicycleSchema = new Schema<TbiCycle>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    type: {
      type: String,
      enum: ETcycletype,
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { timestamps: true },
);

export const BicycleModel = model<TbiCycle>('Bicycle', bicycleSchema);
