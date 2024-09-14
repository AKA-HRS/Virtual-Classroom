// Import required modules
const app = require('./app'); // Import the Express app from app.js
const dotenv = require('dotenv'); // To load environment variables
const path = require('path'); // For handling file paths

// Load environment variables from .env file
dotenv.config();

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unexpected errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // Exit with failure code
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1); // Exit with failure code
});
