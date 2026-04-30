import { createTeacher, getAllTeachers, getTeacherByClass, getTeacherById, getStudentsByTeacherClass } from "../controllers/teacher.controller.js";
import { authenticateToken, teacherOnly } from "../middleware/auth.middleware.js";
import express from "express";

const router = express.Router();



router.post("/", createTeacher);
router.get("/my-students", authenticateToken, teacherOnly, getStudentsByTeacherClass);
router.get("/class/:className", getTeacherByClass);
router.get("/:id",authenticateToken, teacherOnly,  getTeacherById);
router.get("/", getAllTeachers);

export default router;