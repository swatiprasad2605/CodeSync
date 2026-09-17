import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function CreateRepository() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("Private");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) return;

    const repository = {
      id: Date.now(),
      name,
      description,
      visibility,
      language: "JavaScript",
      files: 0,
      updated: "Just now",
    };

    const existing = JSON.parse(localStorage.getItem("repositories")) || [];

    localStorage.setItem(
      "repositories",
      JSON.stringify([...existing, repository]),
    );

    navigate("/repositories");
  };

  return (
    <DashboardLayout>
      <div className="create-repository-page">
        <p className="eyebrow">NEW PROJECT</p>

        <h1>Create Repository</h1>

        <p className="page-description">
          Create a new repository for your coding project.
        </p>

        <form className="repository-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="repo-name">Repository Name</label>

            <input
              id="repo-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Student Management System"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="repo-description">Description</label>

            <textarea
              id="repo-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project..."
              rows="5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="visibility">Visibility</label>

            <select
              id="visibility"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option>Private</option>
              <option>Public</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/repositories")}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              Create Repository
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default CreateRepository;
