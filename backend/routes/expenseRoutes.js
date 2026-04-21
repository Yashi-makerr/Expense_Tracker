import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addExpense, getExpenses } from "../controllers/expenseController.js";  

const router = express.Router();

router.post("/", authMiddleware, addExpense);
router.get("/", authMiddleware, getExpenses);

export default router;