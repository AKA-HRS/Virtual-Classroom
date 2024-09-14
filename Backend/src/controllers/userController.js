const { db } = require("../firebaseAdmin");

// Get user profile from Firestore
const getUserProfile = async (req, res) => {
  try {
    const userRef = db.collection("users").doc(req.user.uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
};

module.exports = { getUserProfile };
