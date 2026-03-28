import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllEvents() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetch("http://localhost:5000/api/events")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="container">
            <h2>All Events</h2>

            <div className="cards" style={{ flexWrap: "wrap" }}>
                {events.length === 0 ? (
                    <p>No events available.</p>
                ) : (
                    events.map((event) => {
                        const approvedCount =
                            event.registrations?.filter(
                                (r) => r.status === "approved"
                            ).length || 0;

                        return (
                            <div key={event._id} className="card">

                                <img
                                    src={
                                        event.image
                                            ? `http://localhost:5000/${event.image}`
                                            : "https://via.placeholder.com/400x200"
                                    }
                                    alt={event.title}
                                />

                                <div className="badge">
                                    {approvedCount} / {event.participantLimit} Approved
                                </div>

                                <h4>{event.title}</h4>

                                <p>College: {event.college}</p>
                                <p>{new Date(event.date).toLocaleDateString()}</p>

                                {!token && (
                                    <p className="login-warning">
                                        🔐 Login to register
                                    </p>
                                )}

                                {user?.role === "student" && (
                                    <button
                                        className="register-btn"
                                        onClick={() => navigate(`/event/${event._id}`)}
                                    >
                                        View Details
                                    </button>
                                )}

                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default AllEvents;