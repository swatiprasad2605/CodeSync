const createVersion = (req, res) => {
  const { repositoryId, versionName, description } = req.body;

  if (!repositoryId || !versionName) {
    return res.status(400).json({
      message: "Repository ID and version name are required"
    });
  }

  const version = {
    id: Date.now(),
    repositoryId,
    versionName,
    description: description || "",
    createdBy: req.user.id,
    createdAt: new Date()
  };

  res.status(201).json({
    message: "Version created successfully",
    version
  });
};

const getVersions = (req, res) => {
  const { repositoryId } = req.params;

  res.json({
    message: "Versions retrieved successfully",
    repositoryId,
    versions: []
  });
};

module.exports = {
  createVersion,
  getVersions
};