import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// ✅ Parse FIREBASE_SERVICE_ACCOUNT from .env
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// ✅ Fix Private Key (Replace `\\n` with actual newlines)
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

// ✅ Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendPushNotification = async (title, message, tokens) => {
  if (!Array.isArray(tokens) || tokens.length === 0) {
    console.log("⚠️ No valid FCM tokens provided.");
    return;
  }

  const payload = {
    notification: {
      title,
      body: message,
    },
    tokens, // Array of device tokens
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(payload);
    console.log("📲 Push Notifications Sent Successfully!", response);
  } catch (error) {
    console.error("❌ Error sending push notification:", error);
  }
};

export default sendPushNotification;
