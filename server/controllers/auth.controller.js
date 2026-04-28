import jwt from 'jsonwebtoken';
import Student from '../models/student.model.js';
import Teacher from '../models/teacher.model.js';


const createToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role,
            className: user.className,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

export const register = async (req, res)=>{
    try{
        const {firstName,lastName, id, className, role}= req.body;

        if (!firstName || !lastName || !id || !className || !role) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        if(role === "student"){
            const existingStudent = await Student.findOne({ id });

            if(existingStudent){
                return res.status(400).json({ message: "Student with this ID already exists" });
            }
            const student = await Student.create({
        firstName,
        lastName,
        id,
        className,
      });
      const user={
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        role: "student",
        className: student.className,
      };
       const token = createToken(user);
        return res.status(201).json({ token, user });
        } 
        if(role === "teacher"){
            const existingTeacher = await Teacher.findOne({ id });

            if(existingTeacher){
                return res.status(400).json({ message: "Teacher with this ID already exists" });
            }
            const teacher = await Teacher.create({
              firstName,
              lastName,
              id,
              className,
            });
            const user={
              id: teacher.id,
              firstName: teacher.firstName,
              lastName: teacher.lastName,
              role: "teacher",
              className: teacher.className,
            };
             const token = createToken(user);
              return res.status(201).json({ token, user });
        }
            return res.status(400).json({ message: "Invalid role" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

export const login = async (req, res)=>{
    try{
        const {id, role}= req.body;
        if (!id || !role) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        let userFromDb=null;
        if(role === "student"){
            userFromDb = await Student.findOne({ id });
        } else if(role === "teacher"){
            userFromDb = await Teacher.findOne({ id });
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }
        if(!userFromDb){
            return res.status(400).json({ message: "User not found" });
        }
        const user={
            id: userFromDb.id || userFromDb.id,
            firstName: userFromDb.firstName,
            lastName: userFromDb.lastName,
            role: role,
            className: userFromDb.className,
        };
        const token = createToken(user);
        return res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

export const getMe = async (req, res)=>{
    res.json(req.user);
};