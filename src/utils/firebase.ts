import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABqo0IcrzX0Jm04-wucU-XpVe9sILMi5g",
  authDomain: "aitrip-837d6.firebaseapp.com",
  projectId: "aitrip-837d6",
  storageBucket: "aitrip-837d6.firebasestorage.app",
  messagingSenderId: "1070046410012",
  appId: "1:1070046410012:web:5361239a96fe6e3078f6d9",
  measurementId: "G-EJ94SMGPKP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

