import mongoose from "mongoose";

// 1️⃣ Define the structure (Schema) for a student
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,     // cannot be empty
      trim: true          // removes spaces before/after
    },
    age: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,       // no two students can have the same email
      lowercase: true,    // convert to lowercase before saving
      trim: true
    }
  },
  { timestamps: true }    // automatically adds createdAt and updatedAt
);

// 2️⃣ Create a model from the schema
const Student = mongoose.model("Student", studentSchema);

// 3️⃣ Export it so we can use it in controllers
export default Student;
