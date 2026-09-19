import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function Versions() {
  const { id } = useParams();

  const defaultVersions = [
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

  const [versions, setVersions] = useState(defaultVersions);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  function createVersion(event) {
    event.preventDefault();

    if (message.trim() === "") {
      return;
    }

    const newVersion = {
      version: "v" + (versions.length + 1) + ".0.0",
      message: message.trim(),
      author: "Demo User",
      date: "Just now",
    };

    setVersions([newVersion, ...versions]);
    setMessage("");
    setShowForm(false);
  }

  function viewVersion(version) {
    alert(
      version.version +
        "\n\n" +
        version.message +
        "\n\nCreated by " +
        version.author,
    );
  }

  return (
    <DashboardLayout>
      <div className="versions-header">
        <div>
          <p className="eyebrow">REPOSITORY VERSIONS</p>
          <h1>Version History</h1>
          <p>Track changes made to this repository.</p>
        </div>

        <div className="version-actions">
          <button
            type="button"
            className="primary-button"
            onClick={function () {
              setShowForm(!showForm);
            }}
          >
            {showForm ? "Close" : "+ New Version"}
          </button>

          <Link to={"/repositories/" + id} className="secondary-button">
            ← Back to Repository
          </Link>
        </div>
      </div>

      {showForm && (
        <form className="version-form" onSubmit={createVersion}>
          <div className="form-group">
            <label htmlFor="version-message">Version Message</label>

            <input
              id="version-message"
              type="text"
              value={message}
              onChange={function (event) {
                setMessage(event.target.value);
              }}
              placeholder="e.g. Added login feature"
              required
            />
          </div>

          <button type="submit" className="primary-button">
            Create Version
          </button>
        </form>
      )}

      <div className="versions-list">
        {versions.map(function (version, index) {
          return (
            <div className="version-card" key={version.version + index}>
              <div className="version-icon">🔀</div>

              <div className="version-content">
                <div className="version-top">
                  <h2>{version.version}</h2>
                  <span>{version.date}</span>
                </div>

                <p>{version.message}</p>

                <small>Created by {version.author}</small>
              </div>

              <button
                type="button"
                className="version-button"
                onClick={function () {
                  viewVersion(version);
                }}
              >
                View
              </button>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}

export default Versions;
