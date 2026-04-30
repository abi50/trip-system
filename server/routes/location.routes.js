import express from 'express';
import { getAllLocations, updateStudentLocation, getMyStudentsLocations, getTeacherLocation} from '../controllers/location.controller.js';
import { authenticateToken, teacherOnly } from '../middleware/auth.middleware.js';
const router = express.Router();


router.get("/my-students", authenticateToken, teacherOnly, getMyStudentsLocations);
router.get("/my-location", authenticateToken, teacherOnly, getTeacherLocation);
router.post('/', updateStudentLocation);
router.get('/', getAllLocations);
export default router;