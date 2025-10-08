// src/components/api.js
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

// GET /api/students
export async function getStudents() {
  const res = await fetch(`${API_URL}/students`);
  if (!res.ok) throw new Error(`Failed to fetch students (${res.status})`);
  return res.json();
}
// DELETE /api/students/:id
export async function deleteStudent(id) {
  const res = await fetch(`${API_URL}/students/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete student");
  return res.json();
}
// 🌐 API URL

// ------------------- COURSES -------------------

// GET /courses → Fetch all courses
export async function getCourses() {
  const res = await fetch(`${API_URL}/courses`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

// POST /courses → Create a new course
export async function createCourse(course) {
  const res = await fetch(`${API_URL}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  if (!res.ok) throw new Error("Failed to create course");
  return res.json();
}
