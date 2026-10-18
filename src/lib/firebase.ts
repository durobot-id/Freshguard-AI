import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyPlaceholderKeyForClientSDK",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "deteksi-makanan-basi.firebaseapp.com",
  databaseURL:
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
    "https://deteksi-makanan-basi-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "deteksi-makanan-basi",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "deteksi-makanan-basi.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "279481061054",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:279481061054:web:dc7444324afda1b00258ef",
};

let app: FirebaseApp | null = null;
let database: Database | null = null;

try {
  if (typeof window !== "undefined" || process.env.NODE_ENV !== "test") {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    database = getDatabase(app);
  }
} catch (error) {
  console.warn("Gagal menginisialisasi Firebase Web SDK:", error);
}

export { app, database, firebaseConfig };
