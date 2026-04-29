import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 9,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Location = mongoose.model("Location", locationSchema);

export default Location;