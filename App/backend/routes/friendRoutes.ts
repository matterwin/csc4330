import express from 'express';
import {
    showAllUsers,
    showFriendsList,
    showSentFriendRequestList,
    showReceivedFriendRequestList,
    sendFriendRequest,
    acceptFriendRequest,
    denyFriendRequest,
    canelFriendRequest,
    removeFriend,
    deleteAllUsers
} from '../controllers/friendController';
import {
    authenticate
} from '../middleware/auth';

const router = express.Router();

router.get('/showAllUsers', authenticate, showAllUsers);
router.get('/showFriends', authenticate, showFriendsList);
router.get('/showSentFriendRequests', authenticate, showSentFriendRequestList);
router.get('/showReceivedFriendRequests', authenticate, showReceivedFriendRequestList);

router.post('/sendFriendRequest', authenticate, sendFriendRequest);
router.post('/acceptFriendRequest', authenticate, acceptFriendRequest);
router.post('/denyFriendRequest', authenticate, denyFriendRequest);

router.delete('/cancelFriendRequest', authenticate, canelFriendRequest);
router.delete('/removeFriend', authenticate, removeFriend);

router.delete('/deleteAllUsers', authenticate, deleteAllUsers);

export default router;
