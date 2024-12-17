const pool = require("../config/db").default;
require("dotenv").config(); // Load environment variables

// Get the table name from environment variable
const TABLE_NAME = process.env.TABLE_NAME;

// Function to insert form data into the database
const saveFormSubmission = async (name, email, subject, message) => {
  const result = await pool.query(
    `INSERT INTO ${TABLE_NAME} (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, email, subject || null, message]
  );
  return result.rows[0];
};

// Function to fetch all form submissions
const getAllSubmissions = async () => {
  const result = await pool.query(`SELECT * FROM ${TABLE_NAME}`);
  return result.rows;
};

module.exports = {
  saveFormSubmission,
  getAllSubmissions,
};
