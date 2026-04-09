import { useEffect, useState } from "react";

function StudentDashboard() {
  const [events, setEvents] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        const myRegistrations = [];

        data.forEach((event) => {
          event.registrations?.forEach((reg) => {
            if (reg.student?._id === user.id) {
              myRegistrations.push({
                ...event,
                status: reg.status
              });
            }
          });
        });

        setEvents(myRegistrations);
      });
  }, [user.id]);

  const getBadge = (status) => {
    const baseStyle = {
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600"
    };

    if (status === "approved")
      return <span style={{ ...baseStyle, background: "#dcfce7", color: "#166534" }}>Approved</span>;

    if (status === "pending")
      return <span style={{ ...baseStyle, background: "#fef3c7", color: "#92400e" }}>Pending</span>;

    if (status === "rejected")
      return <span style={{ ...baseStyle, background: "#fee2e2", color: "#991b1b" }}>Rejected</span>;
  };

  return (
    <div style={{ padding: "40px" }}>
      
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        My Event Registrations
      </h2>

      {/* Cards Container */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center"
        }}
      >
        {events.length === 0 ? (
          <p>No registrations yet</p>
        ) : (
          events.map((event) => {
            const now = new Date();
            const eventStatus =
              new Date(event.date) < now ? "expired" : "active";

            return (
              <div
                key={event._id}
                style={{
                  width: "300px",
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  opacity: eventStatus === "expired" ? 0.6 : 1,
                  transition: "0.3s"
                }}
              >
                <h3 style={{ marginBottom: "10px" }}>{event.title}</h3>

                <p>
                  <strong>College:</strong> {event.college}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>

                {/* Event Status */}
                <p
                  style={{
                    color: eventStatus === "expired" ? "red" : "green",
                    fontWeight: "bold",
                    marginTop: "10px"
                  }}
                >
                  {eventStatus === "expired" ? "Expired" : "Active"}
                </p>

                {/* Registration Status */}
                <div style={{ marginTop: "15px" }}>
                  {getBadge(event.status)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;