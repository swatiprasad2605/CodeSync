const sdk = require("node-appwrite");
const { InputFile } = require("node-appwrite/file");

const client = new sdk.Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const storage = new sdk.Storage(client);

const uploadFile = async (file) => {
  if (!file) {
    throw new Error("File is required");
  }

  const uploadedFile = await storage.createFile({
    bucketId: process.env.APPWRITE_BUCKET_ID,
    fileId: sdk.ID.unique(),
    file: InputFile.fromPath(file.path, file.originalname)
  });

  return {
    fileId: uploadedFile.$id,
    fileName: uploadedFile.name,
    fileSize: uploadedFile.sizeOriginal,
    bucketId: process.env.APPWRITE_BUCKET_ID
  };
};

module.exports = {
  uploadFile
};