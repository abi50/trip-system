import express from 'express';
import { getAllLocations, updateStudentLocation } from '../controllers/location.controller.js';

const router = express.Router();

router.post('/', updateStudentLocation);
router.get('/', getAllLocations);

export default router;