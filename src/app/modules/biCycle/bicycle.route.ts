import { express } from 'express';
import { BicycleControllers } from './bicycle.controller';
const router = express.Router();

router.post('/create-bicycle', BicycleControllers.createBicycle);

export const BicycleRoutes = router;
