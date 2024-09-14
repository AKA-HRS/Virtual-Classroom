// Import required modules
const express = require("express");
const morgan = require("morgan"); // HTTP request logger middleware
const bodyParser = require("body-parser"); // Middleware to parse JSON requests
const cors = require("cors"); // Middleware to enable CORS
const app = express();

// Import routes
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(morgan("dev")); // Log HTTP requests

// Use routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/courses", courseRoutes); // Course management routes
app.use("/users", userRoutes); // User management routes

// Root route (for testing only)
app.get("/", (req, res) => {
  res.send("Welcome to the Virtual Classroom API!");
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Export the app
module.exports = app;
