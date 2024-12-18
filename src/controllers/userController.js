const { registerUser } = require("../models/userModel");
const pool = require("../config/db"); // For checking if the email already exists
require("dotenv").config(); 

const USER_TABLE = process.env.USER_TABLE;
// Helper function to check password strength
const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Function to check if the email already exists
const emailExists = async (email) => {
  const result = await pool.query(
    `SELECT COUNT(*) FROM ${USER_TABLE} WHERE email = $1`, 
    [email]);
  return result.rows.length > 0;
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate password strength
  if (!isValidPassword(password)) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long, include a number, and a special character.",
    });
  }

  // Check if the email already exists
  try {
    const emailExistsResult = await emailExists(email);
    if (emailExistsResult) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Proceed with user registration
    const newUser = await registerUser(username, email, password);
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in registration:", error.message);
    return res.status(500).json({ message: "Error registering user" });
  }
};

module.exports = {
  register,
};
