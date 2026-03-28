import "../Ccss/staticPages.css";

export default function PrivacyPolicy() {
  return (
    <div className="page-bg">
      <div className="page-card">

        <h1 className="page-title">Privacy Policy</h1>
        <p className="page-subtitle">Last Updated: February 2026</p>

        <div className="section">
          <h2>1. Information We Collect</h2>
          <p>We collect personal information such as Name, Email, College Name, Contact Number, Login Credentials, and Event Registration Details.</p>
        </div>

        <div className="section">
          <h2>2. How We Use Your Information</h2>
          <p>Your information is used to manage accounts, enable event registrations, verify participants, provide dashboard access, and improve platform performance.</p>
        </div>

        <div className="section">
          <h2>3. Data Security</h2>
          <p>We implement authentication controls, secure password handling, and restricted admin access to protect your data.</p>
        </div>

        <div className="section">
          <h2>4. Data Sharing</h2>
          <p>We only share necessary participant information with event organizers or when required by law.</p>
        </div>

        <div className="section">
          <h2>5. User Rights</h2>
          <p>You may update your information, request account deletion, or contact us for any data-related concerns.</p>
        </div>

        <div className="section">
          <h2>6. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Continued use of the platform means acceptance of the updated policy.</p>
        </div>

      </div>
    </div>
  );
}