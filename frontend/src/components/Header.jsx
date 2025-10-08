// src/components/Header.jsx
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1>🎓 Student Management System</h1>

      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">👩‍🎓 Students</Link>
          </li>
          <li>
            <Link to="/courses">📚 Courses</Link>
          </li>
          <li>
            <Link to="/about">📄 About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
