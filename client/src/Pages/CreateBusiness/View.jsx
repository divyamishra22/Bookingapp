import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./Styles/View.css";

const BusinessAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedTab, setSelectedTab] = useState("upcoming"); // Track selected tab
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://bookingapp-server-henna.vercel.app/business/gmb", {
          headers: { Authorization: token },
        });
        console.log(response);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const today = moment().format("YYYY-MM-DD");

  // Separate upcoming and past appointments
  const upcomingAppointments = appointments.filter((appt) =>
    moment(appt.date).isSameOrAfter(today)
  );
  const pastAppointments = appointments.filter((appt) =>
    moment(appt.date).isBefore(today)
  );

  // Handle appointment updates
  const handleUpdate = (id) => {
    navigate(`/update-appointment/${id}`);
  };

  // Handle appointment deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/business/appointments/${id}`);
      setAppointments(appointments.filter((appt) => appt._id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div className="appointments-container">
      <h2>Your Appointments</h2>

      {/* Navbar to toggle upcoming/past appointments */}
      <div className="navbar">
        <button
          className={selectedTab === "upcoming" ? "active" : ""}
          onClick={() => setSelectedTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={selectedTab === "past" ? "active" : ""}
          onClick={() => setSelectedTab("past")}
        >
          Past
        </button>
      </div>

      {/* Appointment List */}
      <div className="appointment-list">
        {(selectedTab === "upcoming" ? upcomingAppointments : pastAppointments).length > 0 ? (
          (selectedTab === "upcoming" ? upcomingAppointments : pastAppointments).map((appt) => (
            <div key={appt._id} className="appointment-card">
              <div className="appointment-details">
                <p><strong>Service:</strong> {appt.service}</p>
                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Time:</strong> {appt.time}</p>
              </div>
              {selectedTab === "upcoming" && (
                <div className="button-group">
                  <button className="update-btn" onClick={() => handleUpdate(appt._id)}>Update</button>
                  <button className="cancel-btn" onClick={() => handleDelete(appt._id)}>Cancel</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No {selectedTab === "upcoming" ? "upcoming" : "past"} appointments.</p>
        )}
      </div>
    </div>
  );
};

export default BusinessAppointments;
