import express from 'express';
import { OrderControllers } from './order.Controllers';
const router = express.Router();
router.post('/', OrderControllers.createrOrder);
router.get('/revenue', OrderControllers.getOrderRevenue);
export const OrderRoutes = router;
