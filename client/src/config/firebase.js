import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// 🔹 Your Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// 🔥 Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 🔥 Initialize Messaging
const messaging = getMessaging(app);

export { messaging, getToken };

