import express from 'express';
import { 
    showFriendsList,
    showSentFriendRequestList,
    showReceivedFriendRequestList,
    sendFriendRequest,
    acceptFriendRequest,
    denyFriendRequest,
    canelFriendRequest,
    removeFriend,
} from '../controllers/friendController';
import {
    authenticate
} from '../middleware/auth';

const router = express.Router();

router.get('/showFriends', authenticate, showFriendsList);
router.get('/showSentFriendRequests', authenticate, showSentFriendRequestList);
router.get('/showReceivedFriendRequests', authenticate, showReceivedFriendRequestList);
router.post('/sendFriendRequest', authenticate, sendFriendRequest);
router.post('/acceptFriendRequest', authenticate, acceptFriendRequest);
router.post('/denyFriendRequest', authenticate, denyFriendRequest);
router.post('/cancelFriendRequest', authenticate, canelFriendRequest);
router.post('/removeFriend', authenticate, removeFriend);

export default router;
