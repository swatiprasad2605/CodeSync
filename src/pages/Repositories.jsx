import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

const defaultRepositories = [
  {
    id: 1,
    name: "Student Management System",
    description: "A Java-based student management project.",
    language: "Java",
    updated: "2 days ago",
    files: 18,
  },
  {
    id: 2,
    name: "Portfolio Website",
    description: "Personal portfolio built with React.",
    language: "JavaScript",
    updated: "5 days ago",
    files: 12,
  },
  {
    id: 3,
    name: "DBMS Mini Project",
    description: "Database project for managing coding repositories.",
    language: "SQL",
    updated: "1 week ago",
    files: 9,
  },
];

function Repositories() {
  const [repositories] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("repositories")) || [];

    return [...defaultRepositories, ...saved];
  });

  const getFileCount = (repository) => {
    const savedFiles =
      JSON.parse(localStorage.getItem(`repositoryFiles_${repository.id}`)) ||
      [];

    if (savedFiles.length > 0) {
      return savedFiles.length;
    }

    return repository.files || 0;
  };

  return (
    <DashboardLayout>
      <div className="repositories-header">
        <div>
          <p className="eyebrow">CODESYNC REPOSITORIES</p>

          <h1>My Repositories</h1>

          <p>Manage and access all your coding projects in one place.</p>
        </div>

        <Link to="/create-repository" className="primary-button">
          + Create Repository
        </Link>
      </div>

      <div className="repository-grid">
        {repositories.map((repository) => (
          <div className="repository-card" key={repository.id}>
            <div className="repository-card-top">
              <div className="repository-icon">📁</div>

              <span className="repository-language">{repository.language}</span>
            </div>

            <h2>{repository.name}</h2>

            <p className="repository-description">{repository.description}</p>

            <div className="repository-meta">
              <span>📄 {getFileCount(repository)} files</span>

              <span>🕒 {repository.updated}</span>
            </div>

            <Link
              to={`/repositories/${repository.id}`}
              className="repository-button"
            >
              View Repository →
            </Link>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Repositories;
