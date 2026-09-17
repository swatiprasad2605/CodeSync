const createRepository = (req, res) => {
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

  res.status(201).json({
    message: "Repository created successfully",
    repository
  });
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