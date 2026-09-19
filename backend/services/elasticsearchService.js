const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://localhost:9200"
});

const INDEX_NAME = "codesync-repositories";

const indexRepository = async (repository) => {
  const response = await client.index({
    index: INDEX_NAME,
    id: String(repository.id),
    document: {
      name: repository.name,
      description: repository.description,
      language: repository.language,
      ownerId: repository.ownerId
    },
    refresh: "wait_for"
  });

  console.log("Repository indexed in Elasticsearch:", response.result);
};

module.exports = {
  indexRepository
};