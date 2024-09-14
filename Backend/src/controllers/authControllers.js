// controllers/authController.js
const { auth } = require('../services/firebaseAdmin');

// Handle signup
const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Firebase creates a new user
    const userRecord = await auth.createUser({ email, password });
    res.status(201).json({ message: 'User created successfully', userRecord });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

// Handle login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Firebase Auth client SDK will be used on the frontend for login.
    // For token verification, send the token to backend and verify it here.
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(401).json({ message: 'Login failed', error });
  }
};

module.exports = { signup, login };
