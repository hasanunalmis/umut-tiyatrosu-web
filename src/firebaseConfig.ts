// src/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase konsolundan aldığın config kodunu buraya yapıştır:
const firebaseConfig = {
  apiKey: "AIzaSyDuev4avToDsECWa823S4JLhyQmToi9rgk",
  authDomain: "tiyatro-1cb5c.firebaseapp.com",
  projectId: "tiyatro-1cb5c",
  storageBucket: "tiyatro-1cb5c.firebasestorage.app",
  messagingSenderId: "115992858914",
  appId: "1:115992858914:web:4650f5cb3fc3483e49d57b"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Veritabanı bağlantısını dışarı aktar
export const db = getFirestore(app);