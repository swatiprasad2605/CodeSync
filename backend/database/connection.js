const oracledb = require("oracledb");

const dbConfig = {
  user: "system",
  password: process.env.ORACLE_PASSWORD,
  connectString: "localhost:1521/FREEPDB1"
};

const getConnection = async () => {
  try {
    return await oracledb.getConnection(dbConfig);
  } catch (error) {
    console.error("Oracle Database connection failed:", error);
    throw error;
  }
};

module.exports = getConnection;