// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

// User routes
router.get('/profile', verifyToken, getUserProfile);

module.exports = router;
