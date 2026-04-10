import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    // FORM STATES
    const [form, setForm] = useState({
        teamName: "",
        leaderName: "",
        email: "",
        phone: "",
        collegeName: "",
        yearOfStudy: "",
        branch: "",
        projectTitle: "",
        description: ""
    });

    const [members, setMembers] = useState([""]);
    const [showForm, setShowForm] = useState(false);

    const token = localStorage.getItem("token");

    // FETCH EVENT
    useEffect(() => {
        fetch(`http://localhost:5000/api/events/${id}`)
            .then(res => res.json())
            .then(data => setEvent(data))
            .catch(err => console.log(err));
    }, [id]);

    // HANDLERS
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleMemberChange = (index, value) => {
        const updated = [...members];
        updated[index] = value;
        setMembers(updated);
    };

    // SAFE TEAM SIZE
    const minMembers = event?.teamSize?.min || 1;
    const maxMembers = event?.teamSize?.max || 1;

    const addMember = () => {
        if (members.length >= maxMembers) {
            alert(`Maximum ${maxMembers} members allowed`);
            return;
        }
        setMembers([...members, ""]);
    };

    const removeMember = (index) => {
        if (members.length <= minMembers) {
            alert(`Minimum ${minMembers} members required`);
            return;
        }
        setMembers(members.filter((_, i) => i !== index));
    };

    const handleRegister = async () => {
        if (!token) {
            alert("Please login first");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/events/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    eventId: event._id,
                    ...form,
                    teamMembers: members
                })
            });

            const data = await res.json();
            alert(data.message);
        } catch (err) {
            console.log(err);
            alert("Registration failed");
        }
    };

    // 🔥 FIX: Prevent null error
    if (!event) return <p>Loading...</p>;

    const now = new Date();
    const eventStatus =
        new Date(event.date) < now ? "expired" : "active";

    return (
        <div className="event-details">

            {/* BANNER */}
            <div className="banner">
                <img src={`http://localhost:5000/${event.image}`} alt="" />
                <h1>{event.title}</h1>
            </div>

            <div className="details-grid">

                {/* LEFT */}
                <div className="left">
                    <h2>About</h2>
                    <p>{event.description}</p>

                    <h2>Prizes</h2>
                    <div className="prizes-grid">
                        {event.prizes?.map((p, i) => (
                            <div key={i} className="prize-card">
                                <h4>{p.title}</h4>
                                <p>{p.amount}</p>
                            </div>
                        ))}
                    </div>

                    <h2>Rules</h2>
                    <div className="rules-list">
                        {event.rules?.map((r, i) => (
                            <p key={i}>✔ {r}</p>
                        ))}
                    </div>

                    <h2>Timeline</h2>
                    {event.timeline?.map((t, i) => (
                        <div key={i} className="timeline-card">
                            <h4>{t.title}</h4>
                            <p>
                                {new Date(t.startDate).toLocaleDateString()} -{" "}
                                {new Date(t.endDate).toLocaleDateString()}
                            </p>
                        </div>
                    ))}

                    <h2>Location</h2>
                    <p>{event.location}</p>

                    <iframe
                        title="map"
                        width="100%"
                        height="300"
                        style={{ borderRadius: "12px", border: "none" }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
                    ></iframe>
                </div>

                {/* RIGHT */}
                <div className="right">
                    <h3>Registration Info</h3>

                    <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                    <p><strong>Limit:</strong> {event.participantLimit}</p>
                    <p><strong>Mode:</strong> {event.mode}</p>
                    <p><strong>Team Size:</strong> {minMembers} - {maxMembers}</p>

                    {/* 🚫 Disable if expired */}
                    {eventStatus === "expired" ? (
                        <p style={{ color: "red" }}>Registration Closed</p>
                    ) : !showForm ? (
                        <button
                            className="register-btn"
                            onClick={() => setShowForm(true)}
                        >
                            Register Now
                        </button>
                    ) : (
                        <div className="register-form">

                            <input className="form-input" name="teamName" placeholder="Team Name" onChange={handleChange} />
                            <input className="form-input" name="leaderName" placeholder="Team Leader Name" onChange={handleChange} />
                            <input className="form-input" name="email" placeholder="Email" onChange={handleChange} />
                            <input className="form-input" name="phone" placeholder="Phone" onChange={handleChange} />

                            <h4>Team Members</h4>

                            {members.map((m, index) => (
                                <div key={index} className="member-row">
                                    <input
                                        className="form-input"
                                        placeholder={`Member ${index + 1}`}
                                        value={m}
                                        onChange={(e) => handleMemberChange(index, e.target.value)}
                                    />

                                    <button
                                        type="button"
                                        className="icon-btn delete-btn"
                                        onClick={() => removeMember(index)}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                className="add-btn"
                                onClick={addMember}
                                disabled={members.length >= maxMembers}
                            >
                                Add Member
                            </button>

                            <input className="form-input" name="collegeName" placeholder="College Name" onChange={handleChange} />
                            <input className="form-input" name="yearOfStudy" placeholder="Year of Study" onChange={handleChange} />
                            <input className="form-input" name="branch" placeholder="Branch" onChange={handleChange} />
                            <input className="form-input" name="projectTitle" placeholder="Project Title" onChange={handleChange} />
                            <textarea className="form-input" name="description" placeholder="Project Description" onChange={handleChange} />

                            <button type="button" onClick={handleRegister} className="submit-btn">
                                Submit Registration
                            </button>

                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default EventDetails;