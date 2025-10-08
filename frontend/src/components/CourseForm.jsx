import { useState } from "react";
import { createCourse } from "./api";

export default function CourseForm({ onAdded }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await createCourse({ title });
      setTitle(""); // clear field
      onAdded?.();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="course-form">
      <input
        type="text"
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Course"}
      </button>
    </form>
  );
}
