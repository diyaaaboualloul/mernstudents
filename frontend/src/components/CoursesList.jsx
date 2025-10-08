import { useEffect, useState } from "react";
import { getCourses } from "./api";

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📌 Fetch all courses on page load
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading courses…</p>;
  if (!courses.length) return <p>No courses yet.</p>;

  return (
    <ul>
      {courses.map((course) => (
        <li key={course._id}>{course.title}</li>
      ))}
    </ul>
  );
}
