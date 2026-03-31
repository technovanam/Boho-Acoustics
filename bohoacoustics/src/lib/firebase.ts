import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyrUcwCQOaeosFPx7FN9J1ARItIGcdy1I",
  authDomain: "boho-acoustics.firebaseapp.com",
  projectId: "boho-acoustics",
  storageBucket: "boho-acoustics.firebasestorage.app",
  messagingSenderId: "1032980207151",
  appId: "1:1032980207151:web:13b2a080828ca5144b58da",
  measurementId: "G-M62PL1KZ9K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
