import { useState, useEffect } from "react";
import { API_URL } from "./api";

export default function StudentForm({ onAdded, editingStudent, onUpdated, onCancelEdit }) {
  const [form, setForm] = useState({ name: "", age: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 👉 If we're editing, load the student data into the form
  useEffect(() => {
    if (editingStudent) {
      setForm({
        name: editingStudent.name,
        age: editingStudent.age,
        email: editingStudent.email,
      });
    } else {
      setForm({ name: "", age: "", email: "" });
    }
  }, [editingStudent]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (editingStudent) {
        // 👉 UPDATE
        const res = await fetch(`${API_URL}/students/${editingStudent._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to update student");
        const updated = await res.json();
        onUpdated?.(updated);
      } else {
        // 👉 CREATE
        const res = await fetch(`${API_URL}/students`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to add student");
        const newStudent = await res.json();
        onAdded?.(newStudent);
      }

      setForm({ name: "", age: "", email: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : editingStudent ? "Update Student" : "Add Student"}
      </button>
      {editingStudent && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
