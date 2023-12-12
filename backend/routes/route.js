import express from 'express';
const router = express.Router();
import { loginUser,registerUser,logoutUser, getStats,  updatePeople} from '../contollers/controller.js';
import { protect } from '../authId.js';

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/getStats', getStats);
//router.route('/getStats').get(protect, getStats);
router.route('/updatePeople').put(protect, updatePeople);

export default router;