const app = require("./app"); // Import the Express app
const { testDbConnection } = require("./models/contactModel"); // Import the function for DB connection test

// Database connection check before starting the server
const startServer = async () => {
  try {
    // Test the database connection
    await testDbConnection();

    const PORT = process.env.PORT || 4000;

    // Start the server only if the DB connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};

startServer(); // Start the server
