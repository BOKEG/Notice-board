import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import authRoutes from "./routes/authRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import nodemailer from "nodemailer";

dotenv.config(); // Load environment variables

const app = express();
const server = http.createServer(app); // Create an HTTP server

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Setup Socket.IO for real-time updates
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Your frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 User Connected:", socket.id);

  // Listen for a new notice event
  socket.on("newNotice", (notice) => {
    console.log("📢 New Notice Received:", notice);
    io.emit("receiveNotice", notice); // Broadcast notice to all users
  });

  socket.on("disconnect", () => console.log("🔴 User Disconnected:", socket.id));
});

// Nodemailer setup for email notifications
const sendEmailNotification = async (title, message, studentEmails) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // App password
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: studentEmails.join(","),
    subject: `New Notice: ${title}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log("❌ Email Error:", error);
    else console.log("📧 Email Sent:", info.response);
  });
};

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes(io, sendEmailNotification)); // Pass IO & Email function

// Base Route
app.get("/", (req, res) => {
  res.send("Welcome to the School Notice Board API!");
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
