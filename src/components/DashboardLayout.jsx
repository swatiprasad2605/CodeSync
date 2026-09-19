import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true",
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const navClass = ({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`;

  return (
    <div className={`dashboard-layout ${darkMode ? "dark-mode" : ""}`}>
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span>Code</span>Sync
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={navClass}>
            🏠 Dashboard
          </NavLink>

          <NavLink to="/repositories" className={navClass}>
            📁 Repositories
          </NavLink>

          <NavLink to="/create-repository" className={navClass}>
            ➕ Create Repository
          </NavLink>

          <NavLink to="/profile" className={navClass}>
            👤 Profile
          </NavLink>

          <NavLink to="/search" className={navClass}>
            🔍 Search
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <button className="sidebar-logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main">{children}</main>
    </div>
  );
}

export default DashboardLayout;
