/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './app/modules/biCycle/bicycle.route';
import { OrderRoutes } from './app/modules/order/order.route';
import { AuthRoutes } from './app/modules/AuthRoutes/auth.route';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://cycle-liart.vercel.app'],
    // origin: 'https://cycle-liart.vercel.app',
    credentials: true,
  }),
);
// const allowedOrigins = [
//   'http://localhost:5173', // dev
//   'https://cycle-liart.vercel.app', // production
// ];

// CORS options
// const corsOptions = {
//   origin: function (origin: any, callback: any) {
//     // Allow requests with no origin (like mobile apps or curl)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // Required for cookies/auth headers
// };

// app.use(cors(corsOptions));
app.use('/api/products', BicycleRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/user', UserRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
export default app;
