import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp }
      );

      alert(res.data.message);

      // ✅ go next after success
      navigate("/reset-password");

    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="custom-container">
      <div className="custom-card">
        <h2 className="text-center">Verify OTP</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">OTP</label>
            <input
              type="text"
              className="custom-input"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="custom-btn success">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;