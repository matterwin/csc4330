import express from 'express';
import { 
    createEvent,
    deleteEvent,
    joinEvent,
    unJoinEvent,
    showParticipants,
    allEvents,
    allYourEvents,
    allYourFriendsEvents,
    allPublicExcludingFriendsEvents,
    allSearchedUserEvents,
    singleEvent,
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
router.get('/singleEvent/:eventId', authenticate, singleEvent);
router.get('/showParticipants/:eventId', authenticate, showParticipants);

router.post('/createEvent', authenticate, createEvent);
router.post('/deleteEvent/:eventId', authenticate, deleteEvent);
router.post('/joinEvent/:eventId', authenticate, joinEvent);
router.post('/unJoinEvent/:eventId', authenticate, unJoinEvent);

router.delete('/deleteAllEvents', deleteAllEvents);

export default router;
