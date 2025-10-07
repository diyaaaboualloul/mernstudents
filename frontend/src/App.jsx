// 🌐 Import global styles and components
import "./App.css";
import Header from "./Header";
import "./Header.css";

import StudentsList from "./components/StudentsList";
import StudentForm from "./components/StudentForm";
import { useState } from "react";

// 🧭 Import Router components
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import About from "./pages/About"; // New page we created

function App() {
  const [editingStudent, setEditingStudent] = useState(null);
  const navigate = useNavigate(); // for programmatic navigation

  return (
    <>
      <Header />

      <div className="container">
        {/* 🧭 Simple navigation links */}
        <nav style={{ marginBottom: "20px" }}>
          {/* These <Link> components act like <a>, but without page reload */}
          <Link to="/" style={{ marginRight: "10px" }}>🏠 Home</Link>
          <Link to="/about">📄 About</Link>

          {/* Example: Navigate using a button */}
          <button 
            onClick={() => navigate("/about")} 
            style={{ marginLeft: "10px" }}
          >
            Go to About ➡️
          </button>
        </nav>

        {/* 🧠 Define all routes for your app */}
        <Routes>
          {/* 🏠 Home Page → shows Student Form + List */}
          <Route 
            path="/" 
            element={
              <>
                <h2>Students</h2>
                <StudentForm
                  editingStudent={editingStudent}
                  onCancelEdit={() => setEditingStudent(null)}
                  onAdded={() => window.location.reload()}
                  onUpdated={() => {
                    setEditingStudent(null);
                    window.location.reload();
                  }}
                />
                <StudentsList onEdit={(student) => setEditingStudent(student)} />
              </>
            } 
          />

          {/* 📄 About Page */}
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
