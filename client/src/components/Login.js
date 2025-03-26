import { requestNotificationPermission } from "../config/firebase";

const handleLogin = async () => {
  const token = await requestNotificationPermission();
  
  if (token) {
    await fetch("http://localhost:5000/api/auth/save-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, token }),
    });
  }
};
