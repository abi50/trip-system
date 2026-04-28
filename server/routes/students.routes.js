import express from "express";
import {createStudent, getAllStudents, getStudentByClass, getStudentById} from "../controllers/student.controller.js";

const router = express.Router();

router.post("/", createStudent);
router.get("/class/:className", getStudentByClass);
router.get("/:id", getStudentById);
router.get("/", getAllStudents);

export default router;