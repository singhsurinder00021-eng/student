import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar-custom">
      <div className="navbar-left">
        <h2>🎓 Student Management</h2>
      </div>

      <div className="navbar-right">
        <button
          className="nav-btn"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;