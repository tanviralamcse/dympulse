const pool = require("../config/db");
require("dotenv").config(); // Load environment variables

// Get the table name from environment variable
const TABLE_NAME = process.env.TABLE_NAME;

// Function to insert form data into the database
const saveFormSubmission = async (name, email, subject, message) => {
  try {
    const result = await pool.query(
      `INSERT INTO ${TABLE_NAME} (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, subject || null, message]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error saving form submission:", error.message); // Log the error message
    throw new Error("Failed to save data");
  }
};

// Function to fetch all form submissions
const getAllSubmissions = async () => {
  try {
    const result = await pool.query(`SELECT * FROM ${TABLE_NAME}`);
    return result.rows;
  } catch (error) {
    console.error("Error fetching contact form data:", error.message); // Log the error message
    throw new Error("Failed to retrieve data");
  }
};

// Function to test database connection
const testDbConnection = async () => {
  try {
    const result = await pool.query("SELECT NOW()"); // Just a basic query to test connection
    console.log("Database connection successful:", result.rows);
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
};

// Export the functions
module.exports = {
  saveFormSubmission,
  getAllSubmissions,
  testDbConnection,
};
