require("dotenv").config();
const { Pool } = require("pg");

// Set up database connection
const pool = new Pool({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT || 5432,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
});

// Check database connection
pool.connect()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

module.exports = pool;
