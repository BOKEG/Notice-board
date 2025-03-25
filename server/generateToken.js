import "dotenv/config";
import jwt from "jsonwebtoken";

// Generate a test token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Example usage
const token = generateToken("67e2a058a5526aa84210f1b8");
console.log("Generated Token:", token);
