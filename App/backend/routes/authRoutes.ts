import express from 'express';
import { 
    login,
    register,
    logout
} from '../controllers/authController';
import {
    authenticate
} from '../middleware/auth';

const router = express.Router();

router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/register', register);

export default router;
