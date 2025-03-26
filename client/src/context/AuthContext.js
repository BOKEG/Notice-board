import { createContext, useState, useEffect } from "react";
import { messaging, getToken } from "../config/firebase"; // 🔹 Import Firebase

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [fcmToken, setFcmToken] = useState(null);

  // 🔥 Load user from localStorage when the app starts
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("⚠️ Error parsing stored user:", error);
      localStorage.removeItem("user"); // Remove corrupt data
    }
  }, []);

  // 🔥 Function to request FCM permission & get token
  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("✅ Notification permission granted.");
        const token = await getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" });

        if (token) {
          console.log("🔥 FCM Token:", token);
          setFcmToken(token);
          localStorage.setItem("fcmToken", token); // Store FCM Token

          // 🔹 Send the token to your backend for notifications
          await fetch("http://localhost:5000/api/save-fcm-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user?.id, fcmToken: token }),
          });
        }
      } else {
        console.log("❌ Notification permission denied.");
      }
    } catch (error) {
      console.error("❌ Error getting FCM token:", error);
    }
  };

  // 🔥 Login function
  const login = async (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // 🔹 Request FCM token after login
    await requestNotificationPermission();
  };

  // 🔥 Logout function
  const logout = () => {
    setUser(null);
    setFcmToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("fcmToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, fcmToken }}>
      {children}
    </AuthContext.Provider>
  );
};
