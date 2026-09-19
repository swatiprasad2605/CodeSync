const getConnection = require("../database/connection");
const { indexRepository } = require("../services/elasticsearchService");

const createRepository = async (req, res) => {
  let connection;

  try {
    const { name, description, language, visibility } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Repository name is required"
      });
    }

    connection = await getConnection();

    const result = await connection.execute(
      `INSERT INTO REPOSITORY
       (RepoID, RepoName, Description, Visibility, OwnerID)
       VALUES
       (REPOSITORY_SEQ.NEXTVAL, :name, :description, :visibility, :ownerId)
       RETURNING RepoID INTO :repoId`,
      {
        name,
        description: description || "",
        visibility: visibility || "PRIVATE",
        ownerId: req.user.id,
        repoId: { dir: require("oracledb").BIND_OUT, type: require("oracledb").NUMBER }
      },
      { autoCommit: true }
    );

    const repoId = result.outBinds.repoId[0];

    const repository = {
      id: repoId,
      ownerId: req.user.id,
      name,
      description: description || "",
      language: language || "",
      visibility: visibility || "PRIVATE"
    };

    await indexRepository(repository);

    res.status(201).json({
      message: "Repository created successfully",
      repository
    });
  } catch (error) {
    console.error("Repository creation error:", error);

    res.status(500).json({
      message: "Repository creation failed"
    });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

const getRepositories = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `SELECT
         RepoID,
         RepoName,
         Description,
         Visibility,
         OwnerID,
         CreatedDate
       FROM REPOSITORY
       WHERE OwnerID = :ownerId
       ORDER BY CreatedDate DESC`,
      {
        ownerId: req.user.id
      },
      { outFormat: require("oracledb").OUT_FORMAT_OBJECT }
    );

    res.json({
      message: "Repositories retrieved successfully",
      repositories: result.rows
    });
  } catch (error) {
    console.error("Repository retrieval error:", error);

    res.status(500).json({
      message: "Failed to retrieve repositories"
    });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

module.exports = {
  createRepository,
  getRepositories
};