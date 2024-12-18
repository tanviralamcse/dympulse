const pool = require("../config/db");
require("dotenv").config();

const TABLE_NAME = process.env.TABLE_NAME;

const saveFormSubmission = async (name, email, subject, message) => {
  try {
    const result = await pool.query(
      `INSERT INTO ${TABLE_NAME} (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, subject || null, message]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error saving form submission:", error.message);
    throw new Error("Failed to save data");
  }
};

const getAllSubmissions = async () => {
  try {
    const result = await pool.query(`SELECT * FROM ${TABLE_NAME}`);
    return result.rows;
  } catch (error) {
    console.error("Error fetching contact form data:", error.message);
    throw new Error("Failed to retrieve data");
  }
};

module.exports = {
  saveFormSubmission,
  getAllSubmissions,
};
