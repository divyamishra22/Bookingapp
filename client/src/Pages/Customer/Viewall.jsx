import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import moment from "moment";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [editMode, setEditMode] = useState(null); // Stores the ID of the appointment being edited
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");
  const [upcomingAppointments, setupcomingAppointments] = useState([])
  const [pastAppointments, setpastAppointments] = useState([])
  const token = localStorage.getItem("token");

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await axios.get("https://bookingapp-server-henna.vercel.app/customer/appointment", {
        headers: { Authorization: token },
      });
      setAppointments(response.data);
      const today = moment().startOf("day");
   setupcomingAppointments(appointments.filter((appt) =>
    moment(appt.date).startOf("day").isSameOrAfter(today, "day")
  ));

  setpastAppointments(appointments.filter((appt) =>
    moment(appt.date).startOf("day").isBefore(today, "day")
  ));
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  },[appointments, token]);

  useEffect(() => {
    fetchAppointments();
  },[fetchAppointments]);

  const updateAppointment = async (appointmentId) => {
    try {
      await axios.put(
        `https://bookingapp-server-henna.vercel.app/customer/appointments/${appointmentId}`,
        { date: updatedDate, time: updatedTime }, // Only updating date and time
        { headers: { Authorization: token } }
      );
      setEditMode(null); // Exit edit mode after update
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`https://bookingapp-server-henna.vercel.app/customer/appointments/${appointmentId}`, {
        headers: { Authorization: token },
      });
      setAppointments(appointments.filter((appt) => appt._id !== appointmentId));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  

  return (
    <div className="appointments-container">
      <h1>Your Appointments</h1>

      {/* Upcoming Appointments */}
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
                    <button onClick={() => updateAppointment(appointment._id)}>
                      Save
                    </button>
                    <button onClick={() => setEditMode(null)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => setEditMode(appointment._id)}>
                      Update
                    </button>
                    <button onClick={() => deleteAppointment(appointment._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Past Appointments */}
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
                <p><strong>Status:</strong> {appointment.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
