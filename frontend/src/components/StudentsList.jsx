import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "./api";

// 📝 This component displays the list of students and allows deleting & editing
export default function StudentsList({ onEdit }) {
  // 🧠 students: array to hold the fetched students
  const [students, setStudents] = useState([]);
  // 🧠 loading: shows "Loading..." while fetching data
  const [loading, setLoading] = useState(true);

  // 📌 Runs once when the component is first displayed
  useEffect(() => {
    // Fetch students from backend and update the UI
    async function fetchStudents() {
      const data = await getStudents();  // GET /students
      setStudents(data);                 // store data in state
      setLoading(false);                 // stop loading message
    }
    fetchStudents();
  }, []);

  // 📌 Delete student by ID and update UI
  async function handleDelete(id) {
    if (!window.confirm("Delete this student?")) return; // confirm before deleting
    await deleteStudent(id);                             // DELETE /students/:id
    // Remove deleted student from local state so UI updates instantly
    setStudents(students.filter((s) => s._id !== id));
  }

  // ⏳ Show while waiting for data
  if (loading) return <p>Loading…</p>;
  // 📭 Show if no students exist
  if (!students.length) return <p>No students yet.</p>;

  // 🧠 Show table of students
  return (
    <table className="students-table">
      <thead>
        <tr>
          <th>Name</th><th>Age</th><th>Email</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Loop through each student and display a row */}
        {students.map((s) => (
          <tr key={s._id}>
            <td>{s.name}</td>
            <td>{s.age}</td>
            <td>{s.email}</td>
            <td>
              {/* 📝 Tell parent component which student to edit */}
              <button onClick={() => onEdit(s)}>Edit</button>
              {/* 🗑 Delete the selected student */}
              <button onClick={() => handleDelete(s._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
