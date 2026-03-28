import "../Ccss/staticPages.css";

function About() {
  return (
    <div className="page-bg">
      <div className="page-container">

        <h1 className="page-title">About CampusTech Connect</h1>

        <p className="page-subtitle">
          Your one-stop platform to discover, track and participate in technical events across engineering colleges.
        </p>

        <div className="grid">

          <div className="info-card">
            <h3>Our Mission</h3>
            <p>To centralize all technical opportunities like hackathons, workshops and tech fests in a single platform and make student participation simple and transparent.</p>
          </div>

          <div className="info-card">
            <h3>What We Solve</h3>
            <p>No more missing events due to WhatsApp overload. Get clear eligibility, deadlines and direct registration in one place.</p>
          </div>

          <div className="info-card">
            <h3>For Students</h3>
            <p>Explore events, track registrations, manage teams and build your technical profile.</p>
          </div>

          <div className="info-card">
            <h3>For Organisers</h3>
            <p>Post events, manage participants and view real-time registration analytics.</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default About;