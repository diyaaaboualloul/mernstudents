// src/App.jsx
import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";  // 👈 New Page

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} /> {/* ✅ New route */}
        </Routes>
      </div>
    </>
  );
}

export default App;
