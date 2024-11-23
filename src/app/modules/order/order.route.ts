import express from 'express';
import { OrderControllers } from './order.Controllers';
const router = express.Router();
router.post('/', OrderControllers.createrOrder);
export const OrderRoutes = router;
