import { useEffect, useState } from "react";
import "../Ccss/global.css";
import "../Ccss/organizerdashboard.css";

function OrganiserDashboard() {
  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [college, setCollege] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [participantLimit, setParticipantLimit] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [prizes, setPrizes] = useState("");
  const [rules, setRules] = useState("");
  const [timeline, setTimeline] = useState("");


  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        const myEvents = data.filter(
          (event) => event.organiser?._id === user.id
        );
        setEvents(myEvents);
      });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("college", college);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("participantLimit", participantLimit);
    if (image) {
      formData.append("image", image);
    }
    formData.append("location", location);
    formData.append("mode", mode);
    formData.append("teamSize", teamSize);
    formData.append("prizes", prizes);
    formData.append("rules", rules);
    formData.append("timeline", timeline);

    const response = await fetch(
      "http://localhost:5000/api/events/add",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    );

    const data = await response.json();
    alert(data.message);

    setTitle("");
    setCollege("");
    setDescription("");
    setDate("");
    setParticipantLimit("");
    setImage(null);

    fetchEvents();
  };

  const handleDelete = async (eventId) => {
    await fetch(`http://localhost:5000/api/events/delete/${eventId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchEvents();
  };

  const handleApprove = async (eventId, studentId) => {
    await fetch("http://localhost:5000/api/events/approve", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ eventId, studentId })
    });

    fetchEvents();
  };

  const handleReject = async (eventId, studentId) => {
    await fetch("http://localhost:5000/api/events/reject", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ eventId, studentId })
    });

    fetchEvents();
  };

  const getBadge = (status) => {
    if (status === "approved")
      return <span className="badge-approved">Approved</span>;

    if (status === "pending")
      return <span className="badge-pending">Pending</span>;

    if (status === "rejected")
      return <span className="badge-rejected">Rejected</span>;
  };
  const fillSampleData = () => {
    setTitle("CVR Tech Fest 2026");
    setCollege("CVR College of Engineering");
    setDescription("A grand technical festival with coding, robotics, and innovation.");
    setDate("2026-05-10");
    setParticipantLimit(200);
    setLocation("CVR Campus, Hyderabad");
    setMode("Offline");
    setTeamSize("2-4 members");

    setPrizes([
      { title: "Winner", amount: "₹30,000" },
      { title: "Runner Up", amount: "₹15,000" }
    ]);

    setRules([
      "Team size must be 2-4 members",
      "No plagiarism allowed",
      "Carry ID card"
    ]);

    setTimeline([
      {
        title: "Registration",
        startDate: "2026-04-01",
        endDate: "2026-05-05"
      },
      {
        title: "Event Day",
        startDate: "2026-05-10",
        endDate: "2026-05-10"
      }
    ]);
  };

  return (
    <div className="custom-container">

      {/* ADD EVENT */}
      <div className="custom-card mb-3">

        <h4 className="mb-3">Add New Event</h4>
        <button onClick={fillSampleData}>
          Fill Sample Data ⚡
        </button>
        <form onSubmit={handleAddEvent}>

          <input
            type="text"
            className="custom-input mb-3"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            className="custom-input mb-3"
            placeholder="College Name"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
          />

          <textarea
            className="custom-input mb-3"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="date"
            className="custom-input mb-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
          />
          <input
            type="number"
            className="custom-input mb-3"
            placeholder="Participant Limit"
            value={participantLimit}
            onChange={(e) => setParticipantLimit(e.target.value)}
            required
          />

          <input
            type="file"
            className="custom-input mb-3"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <input
            type="text"
            className="custom-input mb-3"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="text"
            className="custom-input mb-3"
            placeholder="Mode (Online/Offline)"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          />

          <input
            type="text"
            className="custom-input mb-3"
            placeholder="Team Size (2-4 members)"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
          />

          <textarea
            className="custom-input mb-3"
            placeholder='Prizes JSON [{"title":"1st","amount":"10000"}]'
            value={prizes}
            onChange={(e) => setPrizes(e.target.value)}
          />

          <textarea
            className="custom-input mb-3"
            placeholder='Rules JSON ["No cheating","Bring ID"]'
            value={rules}
            onChange={(e) => setRules(e.target.value)}
          />

          <textarea
            className="custom-input mb-3"
            placeholder='Timeline JSON [{"title":"Round 1","startDate":"2026-03-10","endDate":"2026-03-12"}]'
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
          />

          <button type="submit" className="custom-btn primary">
            Add Event
          </button>
        </form>
      </div>

      {/* EVENTS */}
      <div className="events-grid">
        {events.length === 0 ? (
          <p className="text-center">No events created yet.</p>
        ) : (
          events.map((event) => {
            const approvedCount =
              event.registrations?.filter(
                (r) => r.status === "approved"
              ).length || 0;

            const percentage =
              (approvedCount / event.participantLimit) * 100;

            return (
              <div key={event._id} className="custom-card mb-3">

                <img
                  src={
                    event.image
                      ? `http://localhost:5000/${event.image}`
                      : "https://via.placeholder.com/400x200"
                  }
                  alt={event.title}
                  style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "12px" }}
                />

                <h5>{event.title}</h5>
                <p><strong>College:</strong> {event.college}</p>

                {/* progress */}
                <div className="progress-bar">
                  <div className="fill" style={{ width: `${percentage}%` }} />
                </div>

                <button
                  className="custom-btn danger mb-3"
                  onClick={() => handleDelete(event._id)}
                >
                  Delete Event
                </button>

                <h6>Registrations</h6>

                {event.registrations?.map((reg, index) => (
                  <div key={index} className="custom-card mb-3">

                    <p><strong>Student:</strong> {reg.student?.name}</p>
                    <p><strong>Team Name:</strong> {reg.teamName}</p>
                    <p><strong>Leader:</strong> {reg.leaderName}</p>
                    <p><strong>Email:</strong> {reg.email}</p>
                    <p><strong>Phone:</strong> {reg.phone}</p>

                    <p><strong>Members:</strong></p>
                    <ul>
                      {reg.teamMembers?.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>

                    <p><strong>College:</strong> {reg.collegeName}</p>
                    <p><strong>Year:</strong> {reg.yearOfStudy}</p>
                    <p><strong>Branch:</strong> {reg.branch}</p>

                    <p><strong>Project:</strong> {reg.projectTitle}</p>
                    <p><strong>Description:</strong> {reg.description}</p>

                    {getBadge(reg.status)}

                    {reg.status === "pending" && (
                      <div className="mt-3">
                        <button
                          className="custom-btn success"
                          onClick={() =>
                            handleApprove(event._id, reg.student._id)
                          }
                        >
                          Approve
                        </button>

                        <button
                          className="custom-btn secondary"
                          onClick={() =>
                            handleReject(event._id, reg.student._id)
                          }
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default OrganiserDashboard;