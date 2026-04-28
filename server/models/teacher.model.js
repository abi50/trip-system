import mongoose from "mongoose";

const teacherSchema = 
new mongoose.Schema(
  {firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  id: { type: String, required: true, unique: true, minlength: 9, maxlength: 9 },
  className: { type: String, required: true },},
  { timestamps: true }
)

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;