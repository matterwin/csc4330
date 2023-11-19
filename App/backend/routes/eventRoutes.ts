import express from 'express';
import { 
    createEvent,
    deleteEvent,
    allEvents,
    allYourEvents,
    allYourFriendsEvents,
    allPublicExcludingFriendsEvents,
    allSearchedUserEvents,
    deleteAllEvents
} from '../controllers/eventController';
import {
    authenticate
} from '../middleware/auth';

const router = express.Router();

router.get('/allEvents', authenticate, allEvents);
router.get('/allYourEvents', authenticate, allYourEvents);
router.get('/allYourFriendsEvents', authenticate, allYourFriendsEvents);
router.get('/allPublicExcludingFriendsEvents', authenticate, allPublicExcludingFriendsEvents);
router.get('/allSearchedUserEvents', authenticate, allSearchedUserEvents);

router.post('/createEvent', authenticate, createEvent);
router.post('/deleteEvent/:eventId', authenticate, deleteEvent);

router.delete('/deleteAllEvents', deleteAllEvents);

export default router;
