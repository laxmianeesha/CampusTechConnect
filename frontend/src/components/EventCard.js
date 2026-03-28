import { useState } from "react";

function EventCard({ event }) {
  const [showForm, setShowForm] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [leader, setLeader] = useState("");
  const [size, setSize] = useState("");

  const handleSubmit = () => {
    alert(
      `Registered!\nTeam: ${teamName}\nLeader: ${leader}\nMembers: ${size}`
    );
    setShowForm(false);
    setTeamName("");
    setLeader("");
    setSize("");
  };

  return (
    <div style={styles.card}>
      <h3>{event.title}</h3>
      <p><b>College:</b> {event.college}</p>
      <p><b>Type:</b> {event.type}</p>
      <p>
        <b>Participants:</b> {event.current} / {event.limit}
      </p>

      <button style={styles.btn} onClick={() => setShowForm(true)}>
        Register
      </button>

      {showForm && (
        <div style={styles.form}>
          <input
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <input
            placeholder="Team Leader"
            value={leader}
            onChange={(e) => setLeader(e.target.value)}
          />
          <input
            placeholder="Team Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default EventCard;
