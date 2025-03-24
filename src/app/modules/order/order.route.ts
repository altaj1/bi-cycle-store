import express from 'express';
import { OrderControllers } from './order.Controllers';
const router = express.Router();
router.post('/', OrderControllers.createOrder);
router.post('/create-payment-intent', OrderControllers.paymentIntent);
router.get('/revenue', OrderControllers.getOrderRevenue);
// ✅ Get all orders
router.get('/all', OrderControllers.getAllOrders);
router.get('/my/:email', OrderControllers.getOrdersByUser);
export const OrderRoutes = router;
