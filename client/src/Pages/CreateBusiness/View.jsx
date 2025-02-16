import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./Styles/View.css"

const BusinessAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://bookingapp-server-henna.vercel.app/business/gmb", {
          headers: { Authorization: token },
        });
        console.log(response)
        setAppointments(response.data);
        
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Get today's date
  const today = moment().format("YYYY-MM-DD");

  // Separate upcoming and past appointments
  const upcomingAppointments = appointments.filter((appt) =>
    moment(appt.date).isSameOrAfter(today)
  );

  const pastAppointments = appointments.filter((appt) =>
    moment(appt.date).isBefore(today)
  );

  // Function to handle appointment updates
  const handleUpdate = (id) => {
    navigate(`/update-appointment/${id}`);
  };

  // Function to handle appointment deletion
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

      {/* Upcoming Appointments */}
      <h3>Upcoming Appointments</h3>
      <div className="appointment-list">
        {upcomingAppointments.length > 0 ? (
          upcomingAppointments.map((appt) => (
            <div key={appt._id} className="appointment-card">
              <p><strong>Service:</strong> {appt.service}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <button onClick={() => handleUpdate(appt._id)}>Update</button>
              <button onClick={() => handleDelete(appt._id)}>Cancel</button>
            </div>
          ))
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </div>

      {/* Past Appointments */}
      <h3>Past Appointments</h3>
      <div className="appointment-list">
        {pastAppointments.length > 0 ? (
          pastAppointments.map((appt) => (
            <div key={appt._id} className="appointment-card">
              <p><strong>Service:</strong> {appt.service}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
            </div>
          ))
        ) : (
          <p>No past appointments.</p>
        )}
      </div>
    </div>
  );
};

export default BusinessAppointments;
