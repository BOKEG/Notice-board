import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    fileUrl: { type: String, required: true }, // URL of the uploaded file
    uploadedAt: { type: Date, default: Date.now }, // Timestamp
  },
  { timestamps: true }
);

const Timetable = mongoose.model("Timetable", TimetableSchema);
export default Timetable;
