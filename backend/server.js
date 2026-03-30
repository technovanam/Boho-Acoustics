const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Firebase Admin initialization
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Boho Backend API is running!' });
});

// Auth routes
app.post('/api/auth/verify-token', async (req, res) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await auth.verifyIdToken(idToken);
    res.json({ uid: decodedToken.uid, email: decodedToken.email });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Database routes
app.get('/api/data/:collection', async (req, res) => {
  try {
    const { collection } = req.params;
    const snapshot = await db.collection(collection).get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/data/:collection', async (req, res) => {
  try {
    const { collection } = req.params;
    const data = req.body;
    const docRef = await db.collection(collection).add(data);
    res.json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
