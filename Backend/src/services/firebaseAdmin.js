// backend/firebaseAdmin.js
const admin = require("firebase-admin");

// Use the service account key file for Firebase Admin SDK
const serviceAccount = require("./path/to/your/serviceAccountKey.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com"
});

// Firebase services
const auth = admin.auth();
const db = admin.firestore();

module.exports = { auth, db };
