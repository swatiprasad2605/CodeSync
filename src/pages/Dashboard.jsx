import DashboardLayout from "../components/DashboardLayout";

function Dashboard() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">CODESYNC DASHBOARD</p>

          <h1>Welcome back, {user?.name || "User"}!</h1>

          <p>Manage your coding projects, repositories and collaborations.</p>
        </div>

        <button className="primary-button">+ Create Repository</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📁</div>
          <div>
            <p>Repositories</p>
            <h2>0</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <div>
            <p>Files</p>
            <h2>0</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div>
            <p>Collaborations</p>
            <h2>0</h2>
          </div>
        </div>
      </div>

      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h2>Recent Repositories</h2>
            <p>Your recently created projects will appear here.</p>
          </div>
        </div>

        <div className="empty-state">
          <div className="empty-icon">📂</div>

          <h3>No repositories yet</h3>

          <p>
            Create your first repository to start managing your coding projects.
          </p>

          <button className="primary-button">Create Repository</button>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Dashboard;
