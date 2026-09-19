import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

const defaultRepositories = [
  {
    id: 1,
    name: "Student Management System",
    description: "A Java-based student management project.",
    language: "Java",
  },
  {
    id: 2,
    name: "Portfolio Website",
    description: "Personal portfolio built with React.",
    language: "JavaScript",
  },
  {
    id: 3,
    name: "DBMS Mini Project",
    description: "Database project for managing coding repositories.",
    language: "SQL",
  },
];

function Search() {
  const [query, setQuery] = useState("");

  const savedRepositories =
    JSON.parse(localStorage.getItem("repositories")) || [];

  const repositories = [...defaultRepositories, ...savedRepositories];

  const results = repositories.filter((repo) =>
    `${repo.name} ${repo.description} ${repo.language}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="search-header">
        <p className="eyebrow">CODESYNC SEARCH</p>

        <h1>Search</h1>

        <p>Find repositories and projects quickly.</p>
      </div>

      <div className="search-box">
        <span>🔍</span>

        <input
          type="text"
          placeholder="Search repositories..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="search-results">
        {query && (
          <p className="result-count">
            {results.length} result
            {results.length !== 1 ? "s" : ""} found
          </p>
        )}

        {results.map((repo) => (
          <Link
            to={`/repositories/${repo.id}`}
            className="search-result-card"
            key={repo.id}
          >
            <div className="search-result-icon">📁</div>

            <div>
              <h2>{repo.name}</h2>
              <p>{repo.description}</p>
              <span>{repo.language}</span>
            </div>
          </Link>
        ))}

        {query && results.length === 0 && (
          <div className="search-empty">
            <div>🔎</div>
            <h3>No results found</h3>
            <p>Try searching for another repository.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Search;
