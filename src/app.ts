import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './app/modules/biCycle/bicycle.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/products', BicycleRoutes);
// app.get('/api/products', BicycleRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
export default app;
