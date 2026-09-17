import { useState } from "react";

function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = () => {
    if (!file) return;

    onUpload(file);
    setUploaded(true);
    setFile(null);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploaded(false);
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
        disabled={!file}
      >
        Upload File
      </button>

      {uploaded && (
        <p className="upload-success">✓ File uploaded successfully</p>
      )}
    </div>
  );
}

export default FileUpload;
