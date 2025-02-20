import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './app/modules/biCycle/bicycle.route';
import { OrderRoutes } from './app/modules/order/order.route';
import { AuthRoutes } from './app/modules/AuthRoutes/auth.route';

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Allows cookies to be sent and received
  }),
);

app.use('/api/products', BicycleRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/auth', AuthRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
export default app;
