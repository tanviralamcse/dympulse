const pool = require("../config/db");
const bcrypt = require("bcryptjs"); // To hash passwords

const USER_TABLE = process.env.USER_TABLE || "users"; // Fallback to "users" if not set in environment

// Function to register a new user
const registerUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  
    // Check if the email or username already exists in the database
    try {
      const existingUser = await pool.query(
        `SELECT * FROM ${USER_TABLE} WHERE email = $1 OR username = $2`,
        [email, username]
      );
  
      if (existingUser.rows.length > 0) {
        throw new Error("Username or email is already taken");
      }
  
      // If no existing user, insert the new user into the database
      const result = await pool.query(
        `INSERT INTO ${USER_TABLE} (username, email, password) VALUES ($1, $2, $3) RETURNING *`,
        [username, email, hashedPassword]
      );
  
      return result.rows[0]; // Return the registered user
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw new Error(error.message || "User registration failed");
    }
  };

  const getAllUsers = async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${USER_TABLE}`);
      const users = result.rows;
  
      if (!users.length) {
        return res.status(404).json({ message: "No users found." });
      }
  
      return res.status(200).json({
        message: "Users retrieved successfully.",
        data: users,
      });
    } catch (error) {
      console.error("Error fetching users:", error.message);
      return res.status(500).json({ message: "Error retrieving users." });
    }
  };
  
module.exports = {
  registerUser,
  getAllUsers,
};
