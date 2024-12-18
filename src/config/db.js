require("dotenv").config();
const { Pool } = require("pg");

// Log to ensure DATABASE_URL is set (for debugging purposes)
console.log("DATABASE_URL is set:", !!process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use DATABASE_URL here
  ssl: {
    rejectUnauthorized: false, // Required for NeonDB SSL connections
  },
});

// Log the USER_TABLE value to ensure it's correct
const USER_TABLE = process.env.USER_TABLE || "users"; // Fallback to "users" if not set in environment
console.log("Using table:", USER_TABLE);  // Log the table name to verify

// Test database connection
pool.connect()
  .then(() => {
    console.log("Database connected successfully using DATABASE_URL.");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

module.exports = pool;

