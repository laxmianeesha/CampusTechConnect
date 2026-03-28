import "../Ccss/staticPages.css";

export default function TermsAndConditions() {
  return (
    <div className="page-bg">
      <div className="page-card">

        <h1 className="page-title">Terms & Conditions</h1>
        <p className="page-subtitle">Last Updated: February 2026</p>

        <div className="section">
          <h2>1. Account Registration</h2>
          <p>
            Users must provide accurate information and are responsible for
            maintaining login credentials securely.
          </p>
        </div>

        <div className="section">
          <h2>2. Event Registration</h2>
          <p>
            Registration is subject to availability. Organizers may approve or
            reject registrations.
          </p>
        </div>

        <div className="section">
          <h2>3. User Responsibilities</h2>
          <p>
            Users must not misuse the platform, attempt unauthorized access, or
            manipulate event data.
          </p>
        </div>

        <div className="section">
          <h2>4. Organizer Responsibilities</h2>
          <p>
            Organizers must provide accurate event information and handle
            participant data responsibly.
          </p>
        </div>

        <div className="section">
          <h2>5. Termination</h2>
          <p>
            We reserve the right to suspend accounts that violate platform
            policies.
          </p>
        </div>

        <div className="section">
          <h2>6. Limitation of Liability</h2>
          <p>
            Campus Connect is not responsible for event cancellations, disputes,
            or losses resulting from misuse of the platform.
          </p>
        </div>

      </div>
    </div>
  );
}