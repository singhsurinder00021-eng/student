import { useState } from "react";
import { signupUser } from "../api/studentApi";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css"
function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(form);
      alert("Signup Successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="AuthWrapper">
      <div className="container d-flex justify-content-center align-items-center">
  <div className="card p-4 shadow-sm" >
    <h2 className="mb-4 text-center">Signup</h2>

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100 mb-3">
        Signup
      </button>
    </form>

    <p className="text-center">
      Already have an account? <Link to="/login">Login</Link>
    </p>
  </div>
</div>
</div>

  );
}

export default Signup;