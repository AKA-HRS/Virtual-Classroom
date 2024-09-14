const { auth } = require("../services/firebaseAdmin");

// Middleware to verify Firebase token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken; // Store decoded token in request for use in controllers
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error });
  }
};

module.exports = { verifyToken };
