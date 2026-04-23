import mongoose from "mongoose";

const grievanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["Academic", "Hostel", "Transport", "Other"],
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Resolved"],
    default: "Pending"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Grievance", grievanceSchema);