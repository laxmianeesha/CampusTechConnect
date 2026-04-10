import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { email, newPassword }
      );

      alert(res.data.message);

      // ✅ redirect to login
      navigate("/login");

    } catch (err) {
      alert("Error resetting password");
    }
  };

  return (
    <div className="custom-container">
      <div className="custom-card">
        <h2 className="text-center">Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="custom-input"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="custom-btn danger">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;