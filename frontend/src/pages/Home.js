import { useEffect, useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../Ccss/Home.css";

function Home() {
  const scrollRef = useRef();
  const [events, setEvents] = useState([]);


  const [searchText, setSearchText] = useState("");
  const [eventType, setEventType] = useState("");
  const [location, setLocation] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setEvents(data);
      })
      .catch((err) => console.error(err));
  }, []);


  const galleryImages = [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    "https://images.unsplash.com/photo-1526378722484-bd91ca387e72"
  ];


  useEffect(() => {
    const result = events.filter((event) => {
      const matchesText = event.title
        ?.toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesType =
        eventType === "" ||
        event.description?.toLowerCase().includes(eventType.toLowerCase());

      const matchesLocation =
        location === "" ||
        event.college?.toLowerCase().includes(location.toLowerCase());

      return matchesText && matchesType && matchesLocation;
    });

    setFilteredEvents(result);
  }, [searchText, eventType, location, events]);
  const displayEvents = Array.isArray(
    searchText || eventType || location ? filteredEvents : events
  )
    ? (searchText || eventType || location ? filteredEvents : events)
    : [];

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };



  return (
    <div>
      <section className="hero container">

        <div className="hero-left">
          <h1 className="hero-title">
            Empowering <br />
            Student <br />
            <span className="typing">
              Innovation
            </span>
          </h1>


          <p>
            The premium destination for engineering students to discover
            world-class hackathons, hands-on workshops, and major tech fests.
          </p>

          <div className="hero-btns">
            <Link to="/all-events" className="explore-btn">
              Explore Events
            </Link>
            <Link to="/login"><button className="btn-outline">Post an Event</button></Link>
          </div>
        </div>

        <img
          className="hero-img"
          // src="https://chatgpt.com/backend-api/estuary/content?id=file_00000000d16c71f8a6c19e706b9f28cf&ts=492942&p=fs&cid=1&sig=71b5d9575b4b990acefe4c82eb5ac39c17568ae37b5077a61ca4360a16c7fc6a&v=0"
          src="/pictures/6.png"
          alt=""
        />
      </section>

      {/* SEARCH BAR */}
      <div className="search container">
        <input
          placeholder="Search events..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select onChange={(e) => setEventType(e.target.value)}>
          <option value="">Event Type</option>
          <option value="hackathon">Hackathon</option>
          <option value="tech fest">Tech Fest</option>
          <option value="run">Run</option>
        </select>


        <select onChange={(e) => setLocation(e.target.value)}>
          <option value="">College</option>
          <option value="mit">MIT</option>
          <option value="vnr">VNR</option>
          <option value="cvr">CVR</option>
        </select>

        {/* <button onClick={handleSearch}>Find Events</button> */}
      </div>

      <section className="container featured">

        <div className="featured-head">
          <div>
            <h3>Available Events</h3>
            <span>Explore upcoming opportunities</span>
          </div>

          <Link to="/all-events">
            <button className="custom-btn primary ">View All</button>
          </Link>

        </div>

        {/* cards */}
        <div className="cards-wrapper">

          <button className="arrow left" onClick={scrollLeft}>❮</button>

          <div className="cards" ref={scrollRef}>
            {displayEvents.slice(0, 6).map((event) => (
              <div
                key={event._id}
                className="card"
                style={{
                  opacity: event.eventStatus === "expired" ? 0.6 : 1
                }}
              >
                <img
                  src={
                    event.image
                      ? `http://localhost:5000/${event.image}`
                      : "https://via.placeholder.com/400x200"
                  }
                  alt={event.title}
                />

                <h4>{event.title}</h4>
                <p>College: {event.college}</p>
                <p>{new Date(event.date).toLocaleDateString()}</p>

                <p style={{ color: event.eventStatus === "expired" ? "red" : "green" }}>
                  {event.eventStatus === "expired" ? "Expired" : "Active"}
                </p>

                {event.eventStatus === "expired" ? (
                  <button className="custom-btn" disabled>
                    Event Ended
                  </button>
                ) : (
                  <Link to="/all-events">
                    <button className="custom-btn primary">
                      View Details
                    </button>
                  </Link>
                )}
              </div>
            ))}
          </div>

          <button className="arrow right" onClick={scrollRight}>❯</button>

        </div>
        {/* WHY SECTION */}
        <section className="why container">

          <h2>Why Choose CampusTech Connect?</h2>



          <p className="sub">
            We streamline your technical growth by bringing everything under one roof.
          </p>

          <div className="why-grid">

            <div className="why-card">

              <span className="material-symbols-outlined text-3xl font-bold">hub</span>

              <h4>Centralized Events</h4>
              <p>One dashboard for all major college events.</p>
            </div>

            <div className="why-card">
              <span className="material-symbols-outlined text-3xl font-bold">vibration</span>
              <h4>No WhatsApp Spam</h4>
              <p>Direct notifications on our platform.</p>
            </div>

            <div className="why-card">
              <span className="material-symbols-outlined text-3xl font-bold">verified_user</span>
              <h4>Clear Eligibility</h4>
              <p>Apply only to what fits you.</p>
            </div>

            <div className="why-card">
              <span className="material-symbols-outlined text-3xl font-bold">task_alt</span>
              <h4>Easy Registration</h4>
              <p>One-click with your profile.</p>
            </div>

          </div>
        </section>


      </section>

      <section className="gallery-section container">
        <h2>Event Gallery</h2>
        <p className="sub">Glimpses from past events</p>

        <div className="slider">
          <div className="slide-track">
            {galleryImages.concat(galleryImages).map((img, index) => (
              <img key={index} src={img} alt="event" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;