import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

const defaultRepositories = [
  { id: 1, files: 18 },
  { id: 2, files: 12 },
  { id: 3, files: 9 },
];

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "User",
    email: "",
    department: "",
  };

  const savedRepositories =
    JSON.parse(localStorage.getItem("repositories")) || [];

  const repositories = [...defaultRepositories, ...savedRepositories];

  const totalFiles = repositories.reduce((total, repository) => {
    const savedFiles =
      JSON.parse(localStorage.getItem(`repositoryFiles_${repository.id}`)) ||
      [];

    if (savedFiles.length > 0) {
      return total + savedFiles.length;
    }

    return total + (repository.files || 0);
  }, 0);

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">CODESYNC DASHBOARD</p>

          <h1>Welcome back, {user.name}!</h1>

          <p>Manage your coding projects, repositories and collaborations.</p>
        </div>

        <Link to="/create-repository" className="primary-button">
          + Create Repository
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📁</span>

          <div>
            <p>Repositories</p>
            <h2>{repositories.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">📄</span>

          <div>
            <p>Files</p>
            <h2>{totalFiles}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">👥</span>

          <div>
            <p>Collaborations</p>
            <h2>0</h2>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">YOUR PROJECTS</p>
            <h2>Recent Repositories</h2>
          </div>

          <Link to="/repositories">View all →</Link>
        </div>

        {savedRepositories.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📁</div>

            <h3>No repositories yet</h3>

            <p>
              Create your first repository to start managing your coding
              projects.
            </p>

            <Link to="/create-repository" className="primary-button">
              Create Repository
            </Link>
          </div>
        ) : (
          <div className="recent-repositories">
            {savedRepositories
              .slice(-3)
              .reverse()
              .map((repository) => {
                const savedFiles =
                  JSON.parse(
                    localStorage.getItem(`repositoryFiles_${repository.id}`),
                  ) || [];

                const fileCount =
                  savedFiles.length > 0
                    ? savedFiles.length
                    : repository.files || 0;

                return (
                  <Link
                    key={repository.id}
                    to={`/repositories/${repository.id}`}
                    className="recent-repository-card"
                  >
                    <div className="repository-icon">📁</div>

                    <div>
                      <h3>{repository.name}</h3>

                      <p>{repository.description}</p>

                      <span>📄 {fileCount} files</span>
                    </div>
                  </Link>
                );
              })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
