import Teacher from "../models/teacher.model.js";
import Student from "../models/student.model.js";

export const createTeacher = async (req, res) => {
    try {
        const teacherData = req.body;
        const teacher = new Teacher(teacherData);
        const savedTeacher = await teacher.save();
        res.status(201).json(savedTeacher);
    } catch (error) {
        res.status(400).json({
            message: "Error creating teacher",
            error: error.message,
        });
    }
};

export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching teachers",
            error: error.message,
        });
    }
};

export const getTeacherById = async (req, res) => {
    try {
        const teacherId = req.params.id;
        const teacher = await Teacher.findOne({ id: teacherId });
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.json(teacher);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching teacher",
            error: error.message,
        });
    }
};

export const getTeacherByClass = async (req, res) => {
    try {
        const className = req.params.className;
        const teachers = await Teacher.find({ className: className });
        res.json(teachers);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching teachers by class",    
            error: error.message,
        });
    }
};

export const getStudentsByTeacherClass = async (req, res) => {
    try {
        const teacherId = req.params.id;
        const teacher = await Teacher.findOne({ id: teacherId });
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        const students = await Student.find({ className: teacher.className });
        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching students for teacher's class",
            error: error.message,
        });
    }
};
