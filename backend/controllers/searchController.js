const { searchRepositories: searchService } = require("../services/searchService");

const searchRepositories = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required"
      });
    }

    const results = await searchService(query);

    res.json({
      message: "Search completed successfully",
      query,
      results
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Search failed"
    });
  }
};

module.exports = {
  searchRepositories
};