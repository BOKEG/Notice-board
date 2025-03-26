import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  studentEmails: [{ type: String }], // ✅ Add this field
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notice", NoticeSchema);
