import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";  // 👈 new

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes); // 👈 new

// MongoDB + Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("✅ Server running on port 5000")))
  .catch(err => console.error(err));
