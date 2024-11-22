import express from 'express';
import { BicycleControllers } from './bicycle.controller';

const router = express.Router();

router.post('/', BicycleControllers.createBicycle);
router.get('/', BicycleControllers.getAllBicycle);
router.get('/:productId', BicycleControllers.getAllBicycle);

export const BicycleRoutes = router;
