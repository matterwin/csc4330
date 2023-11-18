import express from 'express';
import { 
    showFriendsList,
    showSentFriendRequestList,
    showReceivedFriendRequestList,
    sendFriendRequest
} from '../controllers/friendController';
import {
    authenticate
} from '../middleware/auth';

const router = express.Router();

router.get('/showFriends', authenticate, showFriendsList);
router.get('/showSentFriendRequests', authenticate, showSentFriendRequestList);
router.get('/showReceivedFriendRequests', authenticate, showReceivedFriendRequestList);
router.post('/sendFriendRequest', authenticate, sendFriendRequest);

export default router;
