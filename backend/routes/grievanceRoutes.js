import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addGrievance,
  getGrievances,
  getGrievanceById,
  updateGrievance,
  deleteGrievance,
  searchGrievances
} from "../controllers/grievanceController.js";

const router = express.Router();

// ✅ Create grievance
router.post("/", authMiddleware, addGrievance);

// ✅ Get all grievances
router.get("/", authMiddleware, getGrievances);

// ✅ 🔥 SEARCH MUST COME BEFORE :id
router.get("/search", authMiddleware, searchGrievances);

// ✅ Get by ID
router.get("/:id", authMiddleware, getGrievanceById);

// ✅ Update grievance
router.put("/:id", authMiddleware, updateGrievance);

// ✅ Delete grievance
router.delete("/:id", authMiddleware, deleteGrievance);

export default router;