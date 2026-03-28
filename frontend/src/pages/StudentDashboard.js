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
    if (status === "approved")
      return <span className="badge bg-success">Approved</span>;

    if (status === "pending")
      return <span className="badge bg-warning text-dark">Pending</span>;

    if (status === "rejected")
      return <span className="badge bg-danger">Rejected</span>;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Event Registrations</h2>

      <div className="row">
        {events.length === 0 ? (
          <p className="text-center">You have not registered for any events yet.</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="col-md-4 mb-4">
              <div className="card shadow h-100">
                <div className="card-body d-flex flex-column">

                  <h5 className="card-title">{event.title}</h5>

                  <p className="card-text">
                    <strong>College:</strong> {event.college}
                  </p>

                  <p className="card-text">
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </p>

                  <div className="mt-auto">
                    {getBadge(event.status)}
                  </div>

                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;