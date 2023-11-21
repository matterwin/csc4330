import express from 'express';
import { 
    uploadImage,
    changeProfileImage,
    uploadEventImage,
    uploadImageAuth
} from '../controllers/uploadController';
import {
    authenticate
} from '../middleware/auth';

const router = express.Router();

router.post('/image', uploadImage);
router.post('/imageAuth', uploadImageAuth);
router.post('/profilePic', authenticate, changeProfileImage);
router.post('/eventImage/:eventId', authenticate, uploadEventImage);

export default router;
