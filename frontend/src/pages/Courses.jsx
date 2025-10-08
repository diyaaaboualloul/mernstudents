import CoursesList from "../components/CoursesList";
import CourseForm from "../components/CourseForm";
import { useState } from "react";

export default function Courses() {
  // 🧠 Track course being edited (for future updates)
  const [editingCourse, setEditingCourse] = useState(null);

  return (
    <div>
      <h2>📚 Courses</h2>

      {/* ➕ Add new course */}
      <CourseForm
        editingCourse={editingCourse}
        onAdded={() => window.location.reload()}
      />

      {/* 📋 Display list of courses */}
      <CoursesList />
    </div>
  );
}
