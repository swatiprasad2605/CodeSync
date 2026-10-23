const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const oracledb = require("oracledb");
const getConnection = require("../database/connection");

const register = async (req, res) => {
  let connection;

  try {
    const { name, email, password, department } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    connection = await getConnection();
    const existingUser = await connection.execute(
  `SELECT USERID FROM USERS WHERE LOWER(EMAIL) = LOWER(:email)`,
  { email: email.trim() }
);

if (existingUser.rows.length > 0) {
  return res.status(409).json({
    message: "This email is already registered. Please log in instead."
  });
}
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await connection.execute(
  `SELECT USERS_SEQ.NEXTVAL FROM DUAL`
);

const userId = result.rows[0][0];
    
    await connection.execute(
      `INSERT INTO USERS
       (UserID, Name, Email, Password, Department)
       VALUES
       (:userId, :name, :email, :password, :department)`,
      {
        userId,
        name,
        email: email.trim(),
        password: hashedPassword,
        department: department || null
      },
      { autoCommit: true }
    );

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: userId,
        name,
        email,
        department: department || null
      }
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Registration failed"
    });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

const login = async (req, res) => {
  let connection;

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    connection = await getConnection();

    const result = await connection.execute(
      `SELECT
         UserID,
         Name,
         Email,
         Password,
         Department
       FROM USERS
       WHERE Email = :email`,
      { email },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.PASSWORD
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: user.USERID,
        email: user.EMAIL
      },
      process.env.JWT_SECRET || "codesync-development-secret",
      {
        expiresIn: "1h"
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.USERID,
        name: user.NAME,
        email: user.EMAIL,
        department: user.DEPARTMENT
      }
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Login failed"
    });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

module.exports = {
  register,
  login
};