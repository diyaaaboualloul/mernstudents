import express from "express";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

// 📄 GET all students
router.get("/", getStudents);

// 🟢 CREATE a new student
router.post("/", createStudent);

// ✏️ UPDATE a student by ID
router.put("/:id", updateStudent);

// ❌ DELETE a student by ID
router.delete("/:id", deleteStudent);

export default router;
