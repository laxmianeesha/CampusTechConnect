import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Ccss/global.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidName = (name) => {
    return /^[A-Za-z\s]+$/.test(name);
  };

  const getPasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    if (score <= 2) return "Weak";
    if (score <= 4) return "Medium";
    return "Strong";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidName(name)) {
      setError("❌ Name should contain only letters");
      return;
    }

    if (!isValidEmail(email)) {
      setError("❌ Enter a valid email (example: abc@gmail.com)");
      return;
    }

    
    if (getPasswordStrength(password) === "Weak") {
      setError("❌ Password is too weak");
      return;
    }

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
      setError(data.message);
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

          {error && (
            <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
          )}

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

          {name && (
            <p style={{ color: isValidName(name) ? "green" : "red", fontSize: "12px" }}>
              {isValidName(name) ? "✔ Valid Name" : "❌ Only letters allowed"}
            </p>
          )}

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="text"
              className="custom-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
            />

            {email && (
              <p style={{ fontSize: "12px", color: isValidEmail(email) ? "green" : "red" }}>
                {isValidEmail(email) ? "✔ Valid Email" : "❌ Invalid Email"}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="custom-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Strong password"
            />

            
            {password && (
              <p style={{
                fontSize: "12px",
                fontWeight: "bold",
                color:
                  getPasswordStrength(password) === "Weak"
                    ? "red"
                    : getPasswordStrength(password) === "Medium"
                    ? "orange"
                    : "green"
              }}>
                Strength: {getPasswordStrength(password)}
              </p>
            )}

            {/* Existing rules (unchanged) */}
            <div style={{ fontSize: "12px", marginTop: "5px" }}>
              <p style={{ color: password.length >= 6 ? "green" : "red" }}>
                • Minimum 6 characters
              </p>
              <p style={{ color: /[A-Z]/.test(password) ? "green" : "red" }}>
                • At least 1 capital letter
              </p>
              <p style={{ color: /\d/.test(password) ? "green" : "red" }}>
                • At least 1 number
              </p>
            </div>
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