import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './app/modules/biCycle/bicycle.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', BicycleRoutes);
app.use('/api/orders', OrderRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
export default app;
