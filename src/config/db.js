// Set up database connection
require("dotenv").config();
const { Pool } = require("pg");

// Use DATABASE_URL for connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for NeonDB SSL connections
  },
});

// Check database connection
pool.connect()
  .then(() => {
    console.log("Database connected successfully using DATABASE_URL.");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

module.exports = pool;
