import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import "./Styles/Viewall.css";
import { useNavigate } from "react-router-dom"; // Import the CSS file

const AppointmentsPage = () => {
  const [editMode, setEditMode] = useState(null); // Stores the ID of the appointment being edited
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming"); // Tracks which tab is active
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Fetch Appointments
  const fetchAppointments = useCallback(async () => {
    try {
      const response = await axios.get("https://bookingapp-server-jm2z.onrender.com/customer/appointment", {
        headers: {
          "Authorization": token, // Send JWT in header
          "Content-Type": "application/json",
        },
      });

      const today = moment().startOf("day");

      setUpcomingAppointments(
        response.data.filter((appt) =>
          moment(appt.date).startOf("day").isSameOrAfter(today, "day")
        )
      );

      setPastAppointments(
        response.data.filter((appt) =>
          moment(appt.date).startOf("day").isBefore(today, "day")
        )
      );
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Update Appointment
  const updateAppointment = async (appointmentId) => {
    try {
      const res = await axios.put(
        "https://bookingapp-server-jm2z.onrender.com/customer/update",
        { appointmentId, date: updatedDate, time: updatedTime }, // Passing ID in body
        {
          headers: {
            "Authorization": token, // Send JWT in header
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      setEditMode(null); // Exit edit mode after update
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  // Delete Appointment
  const deleteAppointment = async (appointmentId) => {
    try {
      console.log("Deleting appointment ID:", appointmentId);

      const res = await axios.delete(
        "https://bookingapp-server-jm2z.onrender.com/customer/delete",
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          data: { appointmentId },
        }
      );

      console.log("Delete response:", res.data);
      fetchAppointments(); // Refresh the list after deleting
    } catch (error) {
      console.error("Error deleting appointment:", error.response?.data || error.message);
    }
  };

  return (
    <div className="appointments-container">
      <div className="header">
        <h1>Your Appointments</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="navbar">
        <button
          className={activeTab === "upcoming" ? "active" : ""}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Appointments
        </button>
        <button
          className={activeTab === "past" ? "active" : ""}
          onClick={() => setActiveTab("past")}
        >
          Past Appointments
        </button>
      </div>

      {/* Appointment Lists */}
      {activeTab === "upcoming" ? (
        <div>
          <h2>Upcoming Appointments</h2>
          {upcomingAppointments.length === 0 ? (
            <p>No upcoming appointments.</p>
          ) : (
            <ul className="appointments-list">
              {upcomingAppointments.map((appointment) => (
                <li key={appointment._id} className="appointment-card">
                  <p><strong>Service:</strong> {appointment.service}</p>
                  <p><strong>Date:</strong> {appointment.date}</p>
                  <p><strong>Time:</strong> {appointment.time}</p>

                  {editMode === appointment._id ? (
                    <div>
                      <input
                        type="date"
                        value={updatedDate}
                        onChange={(e) => setUpdatedDate(e.target.value)}
                        required
                      />
                      <input
                        type="time"
                        value={updatedTime}
                        onChange={(e) => setUpdatedTime(e.target.value)}
                        required
                      />
                      <button onClick={() => updateAppointment(appointment._id)}>Save</button>
                      <button onClick={() => setEditMode(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <button onClick={() => setEditMode(appointment._id)}>Update</button>
                      <button onClick={() => deleteAppointment(appointment._id)}>Delete</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div>
          <h2>Past Appointments</h2>
          {pastAppointments.length === 0 ? (
            <p>No past appointments.</p>
          ) : (
            <ul className="appointments-list">
              {pastAppointments.map((appointment) => (
                <li key={appointment._id} className="appointment-card past">
                  <p><strong>Service:</strong> {appointment.service}</p>
                  <p><strong>Date:</strong> {appointment.date}</p>
                  <p><strong>Time:</strong> {appointment.time}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
