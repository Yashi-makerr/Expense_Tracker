import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: ""
  });

  // Fetch expenses
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/api/expense");
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Add expense
  const addExpense = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/expense", form);
      setForm({ title: "", amount: "", category: "" }); // reset form
      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  // Calculate total
  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <div style={{ background: "#f4f6f9", minHeight: "100vh" }}>
      
      <Navbar />

      <div style={{ padding: "20px" }}>
        
        <h1 style={{ textAlign: "center" }}>Expense Dashboard</h1>

        {/* Total Expense */}
        <div style={{
          maxWidth: "500px",
          margin: "20px auto",
          padding: "15px",
          background: "#4CAF50",
          color: "white",
          borderRadius: "10px",
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          Total Expense: ₹{total}
        </div>

        {/* Add Expense Card */}
        <div style={{
          maxWidth: "500px",
          margin: "20px auto",
          padding: "20px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          <h3>Add Expense</h3>

          <form onSubmit={addExpense}>
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />

            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <button type="submit">Add Expense</button>
          </form>
        </div>

        {/* Expense List */}
        <div style={{ maxWidth: "600px", margin: "auto" }}>
          {expenses.length === 0 ? (
            <p style={{ textAlign: "center" }}>No expenses yet</p>
          ) : (
            expenses.map((exp) => (
              <div key={exp._id} style={{
                background: "white",
                padding: "15px",
                margin: "10px 0",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                
                <div>
                  <h4 style={{ margin: "0" }}>{exp.title}</h4>
                  <small style={{ color: "#777" }}>{exp.category}</small>
                </div>

                <div style={{
                  fontWeight: "bold",
                  color: "#4CAF50"
                }}>
                  ₹{exp.amount}
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;