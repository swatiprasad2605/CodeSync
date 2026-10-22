
import { useState } from "react";

function FileUpload({ onUpload, repositoryId }) {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError("");
    setUploaded(false);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in again.");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("repositoryId", repositoryId);

      const response = await fetch(
        "http://localhost:5001/api/files/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed.");
      }

      setUploaded(true);
      setFile(null);

      if (onUpload) {
        await onUpload(data.file);
      }
    } catch (err) {
      setError(err.message || "File upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0] || null);
    setUploaded(false);
    setError("");
  };

  return (
    <div className="file-upload">
      <label className="file-input">
        <span>📎</span>
        <span>{file ? file.name : "Choose a file"}</span>
        <input type="file" onChange={handleFileChange} />
      </label>

      <button
        className="primary-button"
        onClick={handleUpload}
        disabled={!file || loading}
      >
        {loading ? "Uploading..." : "Upload File"}
      </button>

      {uploaded && (
        <p className="upload-success">
          ✓ File uploaded successfully to cloud storage
        </p>
      )}

      {error && <p role="alert">{error}</p>}
    </div>
  );
}

export default FileUpload;
