import { NavLink, useNavigate } from "react-router-dom";

function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  const navClass = ({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`;

  return (
    <div className="dashboard-layout">
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

          <NavLink to="/search" className={navClass}>
            🔍 Search
          </NavLink>

          <NavLink to="/profile" className={navClass}>
            👤 Profile
          </NavLink>
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      <main className="dashboard-main">{children}</main>
    </div>
  );
}

export default DashboardLayout;
