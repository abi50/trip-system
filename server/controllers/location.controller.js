import Location from "../models/location.model.js";
import Student from "../models/student.model.js";

const dmsToDecimal = ({ Degrees, Minutes, Seconds }) => {
  return (
    Number(Degrees) +
    Number(Minutes) / 60 +
    Number(Seconds) / 3600
  );
};

export const updateStudentLocation = async (req, res) => {
    try {
        const {ID, Coordinates, Time} = req.body;
        if(!ID || !Coordinates || !Time) {
            return res.status(400).json({message: "Missing required fields"});
        }
        const student = await Student.findOne({id: ID});

        if(!student) {
            return res.status(404).json({message: "Student not found"});
        }

        const longitude = dmsToDecimal(Coordinates.Longitude);
        const latitude = dmsToDecimal(Coordinates.Latitude);

        const location = await Location.findOneAndUpdate(
            { studentId: String(ID) },
            {
                studentId: String(ID),
                latitude,
                longitude,
                time: new Date(Time),
            },
            {
                new: true,
                upsert: true,
            }
        );
        res.json(location);
    } catch (error) {
        return res.status(500).json({message: "Error updating student location", error: error.message});
    }
};

export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching locations",
      error: error.message,
    });
  }
};