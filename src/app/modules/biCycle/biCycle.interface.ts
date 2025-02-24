/* eslint-disable no-unused-vars */
export enum ETcycletype {
  Mountain = 'Mountain',
  Road = 'Road',
  Hybrid = 'Hybrid',
  BMX = 'BMX',
  Electric = 'Electric',
}
export type TbiCycle = {
  name: string;
  brand: string;
  price: number;
  type: ETcycletype;
  description: string;
  quantity: number;
  inStock: boolean;
  model: string;
  category: string;
  images: string;
};
