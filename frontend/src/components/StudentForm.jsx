import { useState, useEffect } from "react";
import { API_URL } from "./api";

// 📝 This component handles both ➕ adding and ✏️ editing students
export default function StudentForm({ onAdded, editingStudent, onUpdated, onCancelEdit }) {
  // 🧠 form: stores the values of the input fields
  const [form, setForm] = useState({ name: "", age: "", email: "" });
  // 🧠 loading: shows "Saving..." while sending data to backend
  const [loading, setLoading] = useState(false);

  // 📌 When editingStudent changes (user clicked Edit):
  // - If it's not null → load the student data into the form for editing
  // - If it's null → clear the form (new student mode)
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

  // 📌 Runs every time the user types in the input fields
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // 📌 Runs when the form is submitted (Add or Update)
  async function handleSubmit(e) {
    e.preventDefault();         // prevent page refresh
    setLoading(true);           // show "Saving..." on button

    // ✅ If we're editing → send PUT request
    if (editingStudent) {
      const res = await fetch(`${API_URL}/students/${editingStudent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const updated = await res.json();
      onUpdated(updated);       // notify parent component
    } 
    // ✅ If we're adding a new student → send POST request
    else {
      const res = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const newStudent = await res.json();
      onAdded(newStudent);      // notify parent component
    }

    // ✨ Reset the form fields after submission
    setForm({ name: "", age: "", email: "" });
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="student-form">
      {/* 🧠 Input fields bound to form state */}
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

      {/* 📝 Button changes depending on add or edit mode */}
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : editingStudent ? "Update Student" : "Add Student"}
      </button>

      {/* ❌ Show Cancel button only when editing */}
      {editingStudent && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}
