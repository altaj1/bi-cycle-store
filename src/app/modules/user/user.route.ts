import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get('/', UserControllers.getAllUser);
router.get('/:userId', UserControllers.getSingleUser);
router.delete('/:id', UserControllers.deleteUser);
router.patch('/block/:id', UserControllers.toggleBlockUser);

export const UserRoutes = router;
