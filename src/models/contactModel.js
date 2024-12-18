const pool = require("../config/db");
require("dotenv").config(); // Load environment variables

const TABLE_NAME = process.env.TABLE_NAME || "dympulsedb";

// Function to validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to insert form data into the database
const saveFormSubmission = async (name, email, subject, message) => {
  try {
    // Validate input
    if (!name || !email || !message) {
      throw new Error("Name, email, and message are required fields.");
    }

    if (!validateEmail(email)) {
      throw new Error("Invalid email format.");
    }

    // Ensure inputs are trimmed to remove leading/trailing whitespace
    const sanitizedInputs = {
      name: name.trim(),
      email: email.trim(),
      subject: subject ? subject.trim() : null,
      message: message.trim(),
    };

    // Insert into database using parameterized query
    const result = await pool.query(
      `INSERT INTO ${TABLE_NAME} (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        sanitizedInputs.name,
        sanitizedInputs.email,
        sanitizedInputs.subject,
        sanitizedInputs.message,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error saving form submission:", error.message);
    throw new Error(`Failed to save data: ${error.message}`);
  }
};

// Function to fetch all form submissions
const getAllSubmissions = async () => {
  try {
    // Use a parameterized query even if there are no user inputs
    const result = await pool.query(`SELECT * FROM ${TABLE_NAME}`);
    console.log("Fetched data:", result.rows); // Log fetched data
    return result.rows;
  } catch (error) {
    console.error("Error fetching contact form data:", error.message);
    throw new Error(`Failed to retrieve data: ${error.message}`);
  }
};

// Function to test database connection
const testDbConnection = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database connection successful:", result.rows);
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    throw new Error("Database connection failed.");
  }
};

module.exports = {
  saveFormSubmission,
  getAllSubmissions,
  testDbConnection,
};
