import { createTeacher, getAllTeachers, getTeacherByClass, getTeacherById, getStudentsByTeacherClass } from "../controllers/teacher.controller.js";

import express from "express";

const router = express.Router();

router.post("/", createTeacher);
router.get("/class/:className", getTeacherByClass);
router.get("/:id/students", getStudentsByTeacherClass);
router.get("/:id", getTeacherById);
router.get("/", getAllTeachers);

export default router;