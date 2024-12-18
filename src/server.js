// server.js
const app = require("./app"); // Import the Express app
const { testDbConnection } = require("./models/contactModel"); // Import the function

// Call the function to test DB connection
testDbConnection();

const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
