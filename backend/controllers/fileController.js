
const getConnection = require("../database/connection");
const oracledb = require("oracledb");
const { uploadFile: uploadToStorage } = require("../services/storageService");

const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Upload the actual file to Appwrite first.
  let uploadedFile;

  try {
    uploadedFile = await uploadToStorage(req.file);
  } catch (error) {
    console.error("Appwrite upload error:", error);
    return res.status(500).json({
      message: "Cloud upload failed",
      detail: error.message
    });
  }

  const repositoryId = Number(req.body.repositoryId);
  let oracleSaved = false;

  // Save metadata to Oracle when the repository is valid
  // and belongs to the logged-in user.
  let connection;

  try {
    if (Number.isInteger(repositoryId) && repositoryId > 0) {
      connection = await getConnection();

      const repository = await connection.execute(
        `SELECT RepoID FROM REPOSITORY
         WHERE RepoID = :repositoryId AND OwnerID = :ownerId`,
        {
          repositoryId,
          ownerId: Number(req.user.id)
        }
      );

      if (repository.rows.length > 0) {
        const extension = req.file.originalname.includes(".")
          ? req.file.originalname.split(".").pop().toLowerCase()
          : "unknown";

        const fileType = extension.length <= 10 ? extension : "unknown";

        await connection.execute(
          `INSERT INTO FILES
           (FILEID, REPOID, FILENAME, FILETYPE, UPLOADDATE)
           VALUES (FILES_SEQ.NEXTVAL, :repositoryId, :fileName, :fileType, SYSDATE)`,
          {
            repositoryId,
            fileName: uploadedFile.fileName,
            fileType
          },
          { autoCommit: true }
        );

        oracleSaved = true;
      }
    }
  } catch (error) {
    console.error("Oracle metadata save error:", error);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error("Oracle connection close error:", error);
      }
    }
  }

  // A repository mapping problem must not hide a successful cloud upload.
  return res.status(201).json({
    message: oracleSaved
      ? "File uploaded to Appwrite and saved in Oracle"
      : "File uploaded to Appwrite; Oracle metadata was not saved",
    oracleSaved,
    file: {
      id: uploadedFile.fileId,
      appwriteFileId: uploadedFile.fileId,
      repositoryId,
      name: uploadedFile.fileName,
      fileName: uploadedFile.fileName,
      size: uploadedFile.fileSize,
      fileSize: uploadedFile.fileSize,
      bucketId: uploadedFile.bucketId,
      uploadedAt: new Date()
    }
  });
};

const getFiles = async (req, res) => {
  let connection;

  try {
    const repositoryId = Number(req.params.repositoryId);
    connection = await getConnection();

    const result = await connection.execute(
      `SELECT f.FILEID, f.REPOID, f.FILENAME, f.FILETYPE, f.UPLOADDATE
       FROM FILES f
       JOIN REPOSITORY r ON r.REPOID = f.REPOID
       WHERE f.REPOID = :repositoryId AND r.OWNERID = :ownerId
       ORDER BY f.UPLOADDATE DESC`,
      {
        repositoryId,
        ownerId: Number(req.user.id)
      },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.json({
      message: "Files retrieved successfully",
      repositoryId,
      files: result.rows
    });
  } catch (error) {
    console.error("File retrieval error:", error);
    res.status(500).json({
      message: "Failed to retrieve files"
    });
  } finally {
    if (connection) await connection.close();
  }
};

module.exports = { uploadFile, getFiles };
