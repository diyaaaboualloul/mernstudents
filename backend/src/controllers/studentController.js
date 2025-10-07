import Student from "../models/Student.js";

// 📄 GET all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();       // fetch all students
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 CREATE a new student
export const createStudent = async (req, res) => {
  try {
    const { name, age, email } = req.body;

    // simple validation
    if (!name || !age || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newStudent = new Student({ name, age, email });
    const savedStudent = await newStudent.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✏️ UPDATE a student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // return the updated document
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ❌ DELETE a student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
