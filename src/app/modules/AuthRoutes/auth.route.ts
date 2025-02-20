import express from 'express';
import { AuthControllers } from './auth.controllers';

const router = express.Router();
router.post(
  '/register',

  AuthControllers.registerUser,
);
router.post('/login', AuthControllers.login);
router.post('/logout', AuthControllers.logout);
export const AuthRoutes = router;
