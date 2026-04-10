import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import OrganiserDashboard from "./pages/OrganiserDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsandConditions from "./pages/TermsandConditions";
import AllEvents from "./pages/AllEvents";
// import AllEvents from "./pages/AdminDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EventDetails from "./pages/EventDetails";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
/* PROTECTED ROUTE COMPONENT */
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};
const hideFooterRoutes = ["/organiser", "/all-events"];
function App() {
   const location = useLocation();
  return (
    // <Router>
       <div className="app-layout">  
      <Navbar />
  <div className="app-content">  
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsandConditions />} />
        <Route path="/all-events" element={<AllEvents />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/verify-otp" element={<VerifyOtp />} />
<Route path="/reset-password" element={<ResetPassword />} />
        {/* Student Protected */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Organiser Protected */}
        <Route
          path="/organiser"
          element={
            <ProtectedRoute role="organiser">
              <OrganiserDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
        </div>
        {!hideFooterRoutes.includes(location.pathname) && <Footer />} 
        </div>
     
  );
}

export default App;