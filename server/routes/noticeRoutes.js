import express from "express";
import Notice from "../models/Notice.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Function to initialize routes with io and sendPushNotification
const noticeRoutes = (io, sendPushNotification) => {
  // 🔹 GET ALL NOTICES (Public)
  router.get("/", async (req, res) => {
    try {
      const notices = await Notice.find().sort({ createdAt: -1 });
      res.json(notices);
    } catch (error) {
      console.error("❌ Error fetching notices:", error);
      res.status(500).json({ error: "Server Error" });
    }
  });

  // 🔹 POST NOTICE (Admins Only & Sends Push Notifications)
  router.post("/", authMiddleware, async (req, res) => {
    console.log("📩 Incoming Request Data:", req.body);
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Unauthorized: Admins only" });
      }

      const { title, description, category, studentTokens = [] } = req.body;
      if (!title || !description || !category) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Create & Save Notice
      const newNotice = new Notice({ title, description, category });
      await newNotice.save();

      // 🔹 Send Real-time Notification
      io.emit("receiveNotice", newNotice);

      // 🔹 Send Push Notification (if studentTokens are provided)
      if (studentTokens.length > 0) {
        sendPushNotification(title, description, studentTokens);
      }

      res.status(201).json({ message: "✅ Notice added successfully!", newNotice });
    } catch (error) {
      console.error("❌ Error adding notice:", error);
      res.status(500).json({ error: "Server Error" });
    }
  });

  // 🔹 UPDATE NOTICE (Admins Only)
  router.put("/:id", authMiddleware, async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Unauthorized: Admins only" });
      }

      const { title, description, category } = req.body;
      if (!title || !description || !category) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const updatedNotice = await Notice.findByIdAndUpdate(
        req.params.id,
        { title, description, category },
        { new: true }
      );

      if (!updatedNotice) {
        return res.status(404).json({ error: "Notice not found" });
      }

      // 🔹 Send Real-time Update
      io.emit("updateNotice", updatedNotice);

      res.status(200).json({ message: "✅ Notice updated successfully!", updatedNotice });
    } catch (error) {
      console.error("❌ Error updating notice:", error);
      res.status(500).json({ error: "Server Error" });
    }
  });

  // 🔹 DELETE NOTICE (Admins Only)
  router.delete("/:id", authMiddleware, async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Unauthorized: Admins only" });
      }

      const deletedNotice = await Notice.findByIdAndDelete(req.params.id);

      if (!deletedNotice) {
        return res.status(404).json({ error: "Notice not found" });
      }

      // 🔹 Send Real-time Deletion
      io.emit("deleteNotice", req.params.id);

      res.status(200).json({ message: "✅ Notice deleted successfully!" });
    } catch (error) {
      console.error("❌ Error deleting notice:", error);
      res.status(500).json({ error: "Server Error" });
    }
  });

  return router;
};

export default noticeRoutes;
