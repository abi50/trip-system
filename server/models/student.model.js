import mongoose from "mongoose";

const studentSchema = 
new mongoose.Schema(
  {firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  id: { type: String, required: true, unique: true, minlength: 9, maxlength: 9 },
  className: { type: String, required: true },},
  { timestamps: true }
)

const Student = mongoose.model("Student", studentSchema);

export default Student;