import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://campustechconnect.onrender.com/api/auth/forgot-password",
        { email }
      );

      alert(res.data.message);

      localStorage.setItem("email", email);

      // ✅ move after API success
      navigate("/verify-otp");

    } catch (err) {
      alert("Error sending OTP");
    }
  };

  return (
    <div className="custom-container">
      <div className="custom-card">
        <h2 className="text-center">Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="custom-input"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="custom-btn primary">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;