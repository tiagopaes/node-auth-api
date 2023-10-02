import express from 'express';
import UserController from '../controllers/user-controller';
import { authenticateToken } from '../meddlewares/authenticate-token';

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/profile/:id', authenticateToken, UserController.getUserProfile);
router.patch('/profile/password/:id', authenticateToken, UserController.updatePassword);

export default router;
