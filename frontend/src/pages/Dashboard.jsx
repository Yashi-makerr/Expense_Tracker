import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [grievances, setGrievances] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: ""
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const res = await API.get("/api/grievances");
      setGrievances(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ ADD
  const addGrievance = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.category) {
      alert("All fields are required");
      return;
    }

    try {
      await API.post("/api/grievances", form);
      setForm({ title: "", description: "", category: "" });
      fetchGrievances();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  // ✅ DELETE
  const deleteGrievance = async (id) => {
    if (!window.confirm("Delete this grievance?")) return;

    try {
      await API.delete(`/api/grievances/${id}`);
      fetchGrievances();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // ✅ UPDATE STATUS
  const markResolved = async (id) => {
    try {
      await API.put(`/api/grievances/${id}`, {
        status: "Resolved"
      });
      fetchGrievances();
    } catch (err) {
      alert("Update failed");
    }
  };

  // ✅ SEARCH
  const searchGrievance = async () => {
    try {
      const res = await API.get(`/api/grievances/search?title=${search}`);
      setGrievances(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ background: "#f4f6f9", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center" }}>Grievance Dashboard</h1>

        {/* 🔍 SEARCH */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <input
            placeholder="Search grievance..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchGrievance}>Search</button>
          <button onClick={fetchGrievances}>Reset</button>
        </div>

        {/* ADD */}
        <div style={{
          maxWidth: "500px",
          margin: "20px auto",
          padding: "20px",
          background: "white",
          borderRadius: "12px"
        }}>
          <h3>Submit Grievance</h3>

          <form onSubmit={addGrievance}>
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="Academic">Academic</option>
              <option value="Hostel">Hostel</option>
              <option value="Transport">Transport</option>
              <option value="Other">Other</option>
            </select>

            <button type="submit">Submit</button>
          </form>
        </div>

        {/* LIST */}
        <div style={{ maxWidth: "600px", margin: "auto" }}>
          {grievances.length === 0 ? (
            <p>No grievances</p>
          ) : (
            grievances.map((g) => (
              <div key={g._id} style={{
                background: "white",
                padding: "15px",
                margin: "10px 0",
                borderRadius: "10px"
              }}>
                <h4>{g.title}</h4>
                <p>{g.description}</p>

                <small>
                  {g.category} | {g.status}
                </small>

                <br />

                {/* ACTION BUTTONS */}
                <button onClick={() => markResolved(g._id)}>
                  Mark Resolved
                </button>

                <button onClick={() => deleteGrievance(g._id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;