import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://campustechconnect.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    if (data.user.role === "admin") {
      navigate("/admin");
    } else if (data.user.role === "organiser") {
      navigate("/organiser-dashboard");
    } else {
      navigate("/student-dashboard");
    }
  };

  return (
    <div className="custom-container mt-5" style={{ maxWidth: "400px" }}>
      <div className="custom-card shadow-box p-4">
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
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

          <button type="submit" className="custom-btn primary w-100">
            Login
          </button>

          <div className="text-center mt-3">
            <Link to="/register">Register</Link>
          </div>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Link
              to="/forgot-password"
              style={{
                color: "#06b6d4",
                textDecoration: "none",
                fontWeight: "500",
                cursor: "pointer"
              }}
            >
              Forgot Password?
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;