import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Ccss/global.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="custom-container" style={{ maxWidth: "450px" }}>
      <div className="custom-card shadow-box">
        <h3 className="text-center mb-4">Create Account</h3>

        <form onSubmit={handleRegister}>

          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="custom-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="custom-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="custom-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Register As</label>
            <select
              className="custom-input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="organiser">Organiser</option>
            </select>
          </div>

          <button type="submit" className="custom-btn primary">
            Register
          </button>

        </form>
      </div>
    </div>
  );
}

export default Register;