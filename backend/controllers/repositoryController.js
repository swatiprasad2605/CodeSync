const { indexRepository } = require("../services/elasticsearchService");

const createRepository = async (req, res) => {
  try {
    const { name, description, language } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Repository name is required"
      });
    }

    const repository = {
      id: Date.now(),
      ownerId: req.user.id,
      name,
      description: description || "",
      language: language || "",
      createdAt: new Date()
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
  }
};

const getRepositories = (req, res) => {
  res.json({
    message: "Repositories retrieved successfully",
    repositories: []
  });
};

module.exports = {
  createRepository,
  getRepositories
};