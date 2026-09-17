const addComment = (req, res) => {
  const { repositoryId, content } = req.body;

  if (!repositoryId || !content) {
    return res.status(400).json({
      message: "Repository ID and comment content are required"
    });
  }

  const comment = {
    id: Date.now(),
    repositoryId,
    userId: req.user.id,
    content,
    createdAt: new Date()
  };

  res.status(201).json({
    message: "Comment added successfully",
    comment
  });
};

const getComments = (req, res) => {
  const { repositoryId } = req.params;

  res.json({
    message: "Comments retrieved successfully",
    repositoryId,
    comments: []
  });
};

module.exports = {
  addComment,
  getComments
};