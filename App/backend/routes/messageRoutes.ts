import express from 'express';
import { 
    seeListOFDirectMessagesChats,
    createDM,
    sendDM
} from '../controllers/messageController';
import {
    authenticate
} from '../middleware/auth';

const router = express.Router();

router.get('/seeDMChats', authenticate, seeListOFDirectMessagesChats);
router.post('/createDM', authenticate, createDM);
router.post('/sendDM', authenticate, sendDM);

export default router;
