// models/userModel.js
const pool = require("../config/db");
const bcrypt = require("bcryptjs"); // To hash passwords

const USER_TABLE = process.env.USER_TABLE;
// Function to register a new user
const registerUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

  try {
    const result = await pool.query(
      `INSERT INTO ${USER_TABLE} (username, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [username, email, hashedPassword]
    );
    return result.rows[0]; // Return the registered user
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw new Error("User registration failed");
  }
};

module.exports = {
  registerUser,
};
