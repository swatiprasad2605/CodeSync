const { uploadFile: uploadToStorage } = require("../services/storageService");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const uploadedFile = await uploadToStorage(req.file);

    const file = {
      id: uploadedFile.fileId,
      repositoryId: req.body.repositoryId,
      uploadedBy: req.user.id,
      fileName: uploadedFile.fileName,
      fileSize: uploadedFile.fileSize,
      bucketId: uploadedFile.bucketId,
      uploadedAt: new Date()
    };

    res.status(201).json({
      message: "File uploaded successfully to Appwrite",
      file
    });
  } catch (error) {
    console.error("Appwrite upload error:", error);

    res.status(500).json({
      message: "File upload failed"
    });
  }
};

const getFiles = (req, res) => {
  const { repositoryId } = req.params;

  res.json({
    message: "Files retrieved successfully",
    repositoryId,
    files: []
  });
};

module.exports = {
  uploadFile,
  getFiles
};