import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px",
      background: "#333",
      color: "white"
    }}>
      <h3>Expense Tracker</h3>
      <button onClick={logout} style={{
        width: "auto",
        padding: "5px 10px",
        background: "red"
      }}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;