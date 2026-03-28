import "../Ccss/ContactUs.css";


function ContactUs() {
  return (
    <div className="contact container">

      <h1 className="page-title">Contact Us</h1>

      <p className="page-subtitle">
        Have questions, suggestions or partnership ideas? We’d love to hear from you.
      </p>

      <div className="contact-grid">

        {/* LEFT INFO */}
        <div className="contact-info">

          <h3>Email</h3>
          <p>hello@campustech.co</p>

          <h3>Location</h3>
          <p>Innovation Hub, Tech City</p>

          <h3>Support</h3>
          <p>Mon – Fri | 9 AM – 6 PM</p>

        </div>

        {/* RIGHT FORM */}
        <form className="contact-form">

          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>

          <button type="submit">Send Message</button>

        </form>

      </div>
    </div>
  );
}

export default ContactUs;
