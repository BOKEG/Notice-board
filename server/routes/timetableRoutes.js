import express from "express";
import upload from "../middleware/upload.js"; // ✅ Import existing multer config
import Timetable from "../models/Timetable.js";

const router = express.Router();

// 📌 API to Upload a PDF Timetable
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("Received request:", req.body); // Debugging line
    console.log("Uploaded file:", req.file); // Debugging line

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const newTimetable = new Timetable({
      filename: req.file.filename,
      fileUrl: `/uploads/${req.file.filename}`, // Store file URL
    });

    await newTimetable.save();
    res.status(201).json({
      message: "Timetable uploaded successfully!",
      timetable: newTimetable,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 📌 API to Fetch All Timetables
router.get("/", async (req, res) => {
  try {
    const timetables = await Timetable.find();
    res.json(timetables);
  } catch (error) {
    res.status(500).json({ message: "Error fetching timetables", error });
  }
});

export default router;
