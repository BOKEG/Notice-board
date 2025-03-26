import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const token = jwt.sign(
  { id: "67e3c21ddba4abdcd85c0c97", role: "admin" }, 
  process.env.JWT_SECRET, 
  { expiresIn: "1h" } // Token expires in 1 hour
);

console.log("Generated Token:", token);
