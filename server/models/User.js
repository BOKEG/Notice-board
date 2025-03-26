import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["student", "admin"], 
    default: "student",  // Default role is "student"
    required: true 
  },
  fcmToken: { type: String }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
