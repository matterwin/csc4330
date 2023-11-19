import express from 'express';
import { 
    createEvent,
    deleteEvent,
    allEvents,
    deleteAllEvents
} from '../controllers/eventController';
import {
    authenticate
} from '../middleware/auth';

const router = express.Router();

router.get('/allEvents', authenticate, allEvents);
router.post('/createEvent', authenticate, createEvent);
router.post('/deleteEvent/:eventId', authenticate, deleteEvent);
router.delete('/deleteAllEvents', deleteAllEvents);

export default router;
