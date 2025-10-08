// 🌐 Import global styles and components
import "./App.css";
import Header from "./Header";
import "./Header.css";

// 🧭 Router imports
import { Routes, Route } from "react-router-dom";

// 🧭 Import pages
import About from "./pages/About";
import Home from "./pages/Home"; // 👈 New Home page

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          {/* 🏠 Home page route */}
          <Route path="/" element={<Home />} />

          {/* 📄 About page route */}
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
