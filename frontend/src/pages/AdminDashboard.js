import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import "../Ccss/AdminDashboard.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("users");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/events/all-users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  // COLORS
  const COLORS = ["#06b6d4", "#3b82f6"];
  const STATUS_COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  // Charts Data
  const roleData = [
    { name: "Students", value: users.filter(u => u.role === "student").length },
    { name: "Organisers", value: users.filter(u => u.role === "organiser").length }
  ];

  const eventData = events.map(e => ({
    name: e.title,
    count: e.registrations?.length || 0
  }));

  const statusData = [
    {
      name: "Approved",
      value: events.reduce((acc, e) =>
        acc + (e.registrations?.filter(r => r.status === "approved").length || 0), 0)
    },
    {
      name: "Pending",
      value: events.reduce((acc, e) =>
        acc + (e.registrations?.filter(r => r.status === "pending").length || 0), 0)
    },
    {
      name: "Rejected",
      value: events.reduce((acc, e) =>
        acc + (e.registrations?.filter(r => r.status === "rejected").length || 0), 0)
    }
  ];

  const handleApprove = async (userId) => {
    await fetch(`http://localhost:5000/api/admin/approve/${userId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` }
    });

    setUsers(prev =>
      prev.map(u =>
        u._id === userId ? { ...u, status: "approved" } : u
      )
    );
  };

  const handleReject = async (userId) => {
    await fetch(`http://localhost:5000/api/admin/reject/${userId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` }
    });

    setUsers(prev =>
      prev.map(u =>
        u._id === userId ? { ...u, status: "rejected" } : u
      )
    );
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Delete this event?")) return;

    await fetch(`http://localhost:5000/api/admin/delete/${eventId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    setEvents(prev => prev.filter(e => e._id !== eventId));
  };

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2>Admin</h2>
        <button onClick={() => setActiveTab("users")}>Users</button>
        <button onClick={() => setActiveTab("events")}>Events</button>
      </div>

      {/* Main */}
      <div className="admin-main">

        <h2 className="admin-title">Dashboard</h2>

        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-card">
            <h3>{users.length}</h3>
            <p>Total Users</p>
          </div>

          <div className="admin-card">
            <h3>{events.length}</h3>
            <p>Total Events</p>
          </div>

          <div className="admin-card">
            <h3>
              {events.reduce((acc, e) => acc + (e.registrations?.length || 0), 0)}
            </h3>
            <p>Total Registrations</p>
          </div>
        </div>

        {/* Charts */}
        <div className="admin-charts">

          <div className="admin-chart-box">
            <h3>User Roles</h3>
            <PieChart width={250} height={250}>
              <Pie data={roleData} dataKey="value" outerRadius={80} label>
                {roleData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div className="admin-chart-box">
            <h3>Event Registrations</h3>
            <BarChart width={400} height={250} data={eventData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#06b6d4" />
            </BarChart>
          </div>

          <div className="admin-chart-box">
            <h3>Registration Status</h3>
            <PieChart width={250} height={250}>
              <Pie data={statusData} dataKey="value" outerRadius={80} label>
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={STATUS_COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

        </div>

        {/* Users Table */}
        {activeTab === "users" && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>ID Proof</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>

                  <td>
                    <span className={`admin-status ${u.status}`}>
                      {u.status}
                    </span>
                  </td>

                  <td>
                    {u.idProof ? (
                      <a href={`http://localhost:5000/${u.idProof}`} target="_blank" rel="noreferrer">
                        View
                      </a>
                    ) : "No File"}
                  </td>

                  <td>
                    {u.role === "organiser" && u.status === "pending" && (
                      <>
                        <button className="admin-btn admin-approve" onClick={() => handleApprove(u._id)}>Approve</button>
                        <button className="admin-btn admin-reject" onClick={() => handleReject(u._id)}>Reject</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Events Table */}
        {activeTab === "events" && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>College</th>
                <th>Date</th>
                <th>Limit</th>
                <th>Approved</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {events.map((e) => {
                const approved =
                  e.registrations?.filter(r => r.status === "approved").length || 0;

                return (
                  <tr key={e._id}>
                    <td>{e.title}</td>
                    <td>{e.college}</td>
                    <td>{new Date(e.date).toLocaleDateString()}</td>
                    <td>{e.participantLimit}</td>
                    <td>{approved}</td>

                    <td>
                      <button className="admin-btn admin-delete" onClick={() => handleDelete(e._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;