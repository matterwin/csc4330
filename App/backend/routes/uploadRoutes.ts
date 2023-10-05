import express from 'express';
import { 
    uploadImage,
    changeProfileImage
} from '../controllers/uploadController';
import {
    authenticate
} from '../middleware/auth';

const router = express.Router();

router.post('/image', uploadImage);
router.post('/profile', authenticate, changeProfileImage);

export default router;
