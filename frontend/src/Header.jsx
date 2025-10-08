// src/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate(); 

  return (
    <header className="header">
      <h1>🎓 Student Management System</h1>

      <nav>
        <ul className="nav-links">
          {/* These <Link> components work like <a> but don't reload the page */}
        
          <li>
            <Link to="/">👩‍🎓 Students</Link>
          </li>
          <li>
            <Link to="/about">📄 About</Link>
          </li>

          {/* Optional: Example of using navigate() inside header */}
          <li>
            <button onClick={() => navigate("/about")} className="nav-btn">
              ➡️ Go to About
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
