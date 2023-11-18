import express from 'express';
import { 
    userProfile,
    updatePublicProfile
} from '../controllers/userController';
import {
    authenticate
} from '../middleware/auth';

const router = express.Router();

router.post('/profile', authenticate, userProfile);
router.patch('/updatePublicProfile', authenticate, updatePublicProfile);

export default router;
