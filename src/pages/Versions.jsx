import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function Versions() {
  const { id } = useParams();

  const versions = [
    {
      version: "v1.0.0",
      message: "Initial project upload",
      author: "Demo User",
      date: "Today",
    },
    {
      version: "v0.2.0",
      message: "Added project files",
      author: "Demo User",
      date: "2 days ago",
    },
    {
      version: "v0.1.0",
      message: "Created repository",
      author: "Demo User",
      date: "5 days ago",
    },
  ];

  return (
    <DashboardLayout>
      <div className="versions-header">
        <div>
          <p className="eyebrow">REPOSITORY VERSIONS</p>
          <h1>Version History</h1>
          <p>Track changes made to this repository.</p>
        </div>

        <Link to={`/repositories/${id}`} className="secondary-button">
          ← Back to Repository
        </Link>
      </div>

      <div className="versions-list">
        {versions.map((version) => (
          <div className="version-card" key={version.version}>
            <div className="version-icon">🔀</div>

            <div className="version-content">
              <div className="version-top">
                <h2>{version.version}</h2>
                <span>{version.date}</span>
              </div>

              <p>{version.message}</p>

              <small>Created by {version.author}</small>
            </div>

            <button className="version-button">View</button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Versions;
