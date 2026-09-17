import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import FileUpload from "../components/FileUpload";

function RepositoryDetails() {
  const { id } = useParams();

  const [files, setFiles] = useState([
    { name: "README.md", size: "2 KB", type: "file" },
    { name: "src", size: "Folder", type: "folder" },
    { name: "package.json", size: "1 KB", type: "file" },
    { name: "index.js", size: "4 KB", type: "file" },
  ]);

  const repository = {
    name: "Student Management System",
    description: "A Java-based student management project.",
    language: "Java",
    visibility: "Private",
  };

  const handleFileUpload = (file) => {
    const newFile = {
      name: file.name,
      size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
      type: "file",
    };

    setFiles((previous) => [...previous, newFile]);
  };

  return (
    <DashboardLayout>
      <div className="repo-details-header">
        <div>
          <p className="eyebrow">REPOSITORY</p>
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </div>
      </div>

      <div className="repo-info-grid">
        <div className="repo-info-card">
          <span>Language</span>
          <strong>{repository.language}</strong>
        </div>

        <div className="repo-info-card">
          <span>Files</span>
          <strong>{files.length}</strong>
        </div>

        <div className="repo-info-card">
          <span>Visibility</span>
          <strong>{repository.visibility}</strong>
        </div>
      </div>

      <FileUpload onUpload={handleFileUpload} />

      <div className="repo-tabs">
        <Link className="repo-tab active" to={`/repositories/${id}`}>
          Files
        </Link>

        <Link className="repo-tab" to={`/repositories/${id}/versions`}>
          Versions
        </Link>

        <Link className="repo-tab" to={`/repositories/${id}/comments`}>
          Comments
        </Link>
      </div>

      <div className="files-section">
        <h2>Project Files</h2>

        {files.map((file, index) => (
          <div className="file-row" key={`${file.name}-${index}`}>
            <span>
              {file.type === "folder" ? "📁" : "📄"} {file.name}
            </span>

            <span>{file.size}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default RepositoryDetails;
