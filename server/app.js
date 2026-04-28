import express from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import e from 'cors';

import studentsRoutes from './routes/students.routes.js';
import teachersRoutes from './routes/teacher.routes.js';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middleware/auth.middleware.js';

dotenv.config();

const app = express();


const PORT = process.env.PORT || 5000;

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
  });
  
  app.use(cors());
  app.use(express.json());
  
  app.use("/api/students",  studentsRoutes);     
  app.use("/api/teachers", teachersRoutes);
  app.use("/api/auth", authRoutes);

  app.use(errorHandler);
  
      app.get('/', (req, res) => {
        res.send('Hello World!');
      });