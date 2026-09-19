const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://localhost:9200"
});

const INDEX_NAME = "codesync-repositories";

const searchRepositories = async (query) => {
  if (!query) {
    return [];
  }

  const response = await client.search({
    index: INDEX_NAME,
    query: {
      multi_match: {
        query,
        fields: [
          "name",
          "description",
          "language"
        ]
      }
    }
  });

  return response.hits.hits.map((hit) => ({
    id: hit._id,
    ...hit._source
  }));
};

module.exports = {
  searchRepositories
};