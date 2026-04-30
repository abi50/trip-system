import express from 'express';
import { getAllLocations, updateStudentLocation, getMyStudentsLocations} from '../controllers/location.controller.js';

const router = express.Router();

router.get('/teacher/:teacherId', getMyStudentsLocations);
router.post('/', updateStudentLocation);
router.get('/', getAllLocations);
export default router;