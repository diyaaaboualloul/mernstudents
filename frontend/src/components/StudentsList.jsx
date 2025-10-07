import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "./api";

export default function StudentsList({ onEdit }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    try {
      setLoading(true);
      const data = await getStudents();
      setStudents(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      setStudents(students.filter((s) => s._id !== id)); // remove from UI
    } catch (e) {
      alert("Delete failed: " + e.message);
    }
  }

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;
  if (!students.length) return <p>No students yet.</p>;

  return (
    <table className="students-table">
      <thead>
        <tr>
          <th>Name</th><th>Age</th><th>Email</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s._id}>
            <td>{s.name}</td>
            <td>{s.age}</td>
            <td>{s.email}</td>
            <td>
              <button onClick={() => onEdit?.(s)}>Edit</button>
              <button onClick={() => handleDelete(s._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
