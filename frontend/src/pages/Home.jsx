// src/pages/Home.jsx
import { useState } from "react";
import StudentsList from "../components/StudentsList";
import StudentForm from "../components/StudentForm";

export default function Home() {
  const [editingStudent, setEditingStudent] = useState(null);

  return (
    <div>
      <h2>Students</h2>

      {/* ✏️ Form for adding and editing */}
      <StudentForm
        editingStudent={editingStudent}
        onCancelEdit={() => setEditingStudent(null)}
        onAdded={() => window.location.reload()}
        onUpdated={() => {
          setEditingStudent(null);
          window.location.reload();
        }}
      />

      {/* 📋 List of students */}
      <StudentsList onEdit={(student) => setEditingStudent(student)} />
    </div>
  );
}
