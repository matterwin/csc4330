import express from 'express';
import { 
    seeListOFDirectMessagesChats,
    createDMChat,
    sendDM
} from '../controllers/messageController';
import {
    authenticate
} from '../middleware/auth';

const router = express.Router();

router.get('/seeDMChats', authenticate, seeListOFDirectMessagesChats);
router.post('/createDM', authenticate, createDMChat);
router.post('/sendDM', authenticate, sendDM);

export default router;
