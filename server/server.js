import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import authRoutes from "./routes/authRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import sendPushNotification from "./firebase.js"; // Import push notification function

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

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes(io, sendPushNotification)); // Pass IO & Push Notification function

// Base Route
app.get("/", (req, res) => {
  res.send("Welcome to the School Notice Board API!");
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
