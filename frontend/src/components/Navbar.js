import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <style>{`
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 40px;
        }

        .logo {
          font-weight: 700;
        }

        .logo span {
          color: #06b6d4;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .nav-right a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
        }

        .login-btn {
          background: #06b6d4;
          color: white;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>

      <nav className="nav">

        <h2 className="logo">
          CampusTech <span>Connect</span>
        </h2>

        <div className="nav-right">

          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          {/* <Link to="/contact">Contact Us</Link> */}

          {token && user?.role === "student" && (
            <Link to="/student">Dashboard</Link>
          )}

          {token && user?.role === "organiser" && (
            <Link to="/organiser">Dashboard</Link>
          )}

          {!token ? (
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          ) : (
            <button className="login-btn" onClick={handleLogout}>
              Logout
            </button>
          )}

        </div>

      </nav>
    </>
  );
}

export default Navbar;