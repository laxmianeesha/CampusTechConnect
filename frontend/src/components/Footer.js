import "../Ccss/Footer.css";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">

        <div>
          <h3 className="logo">CampusTech <span>Connect</span></h3>
          <p className="footer-text">
            Elevating the engineering community through discovery and
            participation in top-tier technical events.
          </p>

        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
           <Link to="/about"><li>Find Events</li></Link>
            <Link to="/about">
                        <li>About Us</li>
                    </Link>
            <Link to="/about"><li>Event Dashboard</li></Link>
          </ul>
        </div>

        <div>
          <h4>Support</h4>
          <ul>
            
            <Link to="/privacy"><li>Privacy Policy</li></Link>
            <Link to="/terms"><li>Terms of Service</li></Link>
             <Link to="/contact"><li>Contact Us</li></Link>
          </ul>
        </div>

      </div>

      <div className="footer-bottom container">

        <div className="bottom-links">
          <span>LinkedIn</span>
          <span>Twitter</span>
          <span>GitHub</span>
        </div>
      </div>
    </footer>
  );
}
