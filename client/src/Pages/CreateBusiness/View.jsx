import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import "./Styles/View.css";
import { useNavigate } from "react-router-dom";

const BusinessAppointments = () => {
  const [appointments, setAppointments] = useState([]);
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
  

    const fetchAppointments = useCallback(async () => {
      try {
        const response = await axios.get("https://bookingapp-server-jm2z.onrender.com/business/gmb", {
          headers: {
            "Authorization": token, // Send JWT in header
            "Content-Type": "application/json",
          },
        });
  
        setAppointments(response.data);
  
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
    }, [token, ]);
  
    useEffect(() => {
      fetchAppointments();
    }, [fetchAppointments]);
       

 

  
  
  

  

  
  

  return (
    <div className="appointments-container">
    <h1>Your Appointments</h1>
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
        {upcomingAppointments.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          <ul className="appointments-list">
            {upcomingAppointments.map((appointment) => (
              <li key={appointment._id} className="appointment-card">
                <p><strong>Service:</strong> {appointment.service}</p>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
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

export default BusinessAppointments;
