import Expense from "../models/Expense.js";

// ADD EXPENSE
export const addExpense = async (req, res) => {
  const { title, amount, category } = req.body;

  const expense = new Expense({
    userId: req.user.id,
    title,
    amount,
    category
  });

  await expense.save();
  res.json(expense);
};

// GET EXPENSES
export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id });
  res.json(expenses);
};