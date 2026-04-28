import Student from "../models/student.model.js";

export const createStudent = async (req, res) => {
  try {
    const studentData = req.body;

    const student = new Student(studentData);
    const savedStudent = await student.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({
      message: "Error creating student",
      error: error.message,
    });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error: error.message,
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ id: studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }   
    res.json(student);
    } catch (error) {
    res.status(500).json({
      message: "Error fetching student",
      error: error.message,
    });
  } 
};

export const getStudentByClass = async (req, res) => {
  try {
    const className = req.params.className;
    const students = await Student.find({ className: className });
    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students by class",
      error: error.message,
    });
  }
};
