import express from "express";
import {createStudent, getAllStudents, getStudentByClass, getStudentById} from "../controllers/student.controller.js";
import { authenticateToken, teacherOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createStudent);
router.get("/class/:className", authenticateToken, teacherOnly, getStudentByClass);
router.get("/:id", authenticateToken, teacherOnly, getStudentById);
router.get("/", authenticateToken, teacherOnly, getAllStudents);

export default router;