import express from 'express';
import { 
    initHobbies,
    showAllHobbies,
    showUsersHobbies,
    addHobbyToUser,
    deleteHobbyForUser
} from '../controllers/hobbyController';
import {
    authenticate
} from '../middleware/auth';

const router = express.Router();

router.get('/showAllHobbies', authenticate, showAllHobbies);
router.get('/showUsersHobbies', authenticate, showUsersHobbies);

router.post('/initHobbies', authenticate, initHobbies);
router.post('/addHobbyToUser', authenticate, addHobbyToUser);

router.delete('/deleteHobbyForUser', authenticate, deleteHobbyForUser);

export default router;
