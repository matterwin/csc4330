import express from 'express';
import { 
    userProfile
} from '../controllers/userController';
import {
    authenticate
} from '../middleware/auth';

const router = express.Router();

router.post('/profile', authenticate, userProfile);

export default router;
