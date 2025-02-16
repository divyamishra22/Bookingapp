import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const BookAppointment = () => {
  const { gmbReferenceId } = useParams(); // Get gmbReferenceId from URL
  const navigate = useNavigate();
  const location = useLocation();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = location.state?.service || "";


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");  // Assuming user ID is stored

    const appointmentData = {
      user: user._id,
      service: services, // Update with actual service
      date,
      time,
      status: "pending",
      gmbReferenceId, // Now using gmbReferenceId from database
    };

    try {
      const response = await axios.post(
        "https://bookingapp-server-henna.vercel.app/customer/appointments",
        appointmentData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Appointment Booked:", response.data);// Redirect to home or confirmation page
    } catch (error) {
      console.error("Error booking appointment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="appointment-container">
      <h1>Book Your Appointment</h1>
      <form onSubmit={handleSubmit}>
        <label>Select Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label>Select Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

        <button type="submit" disabled={isSubmitting} onClick={() => navigate(`/viewall`)}>
          {isSubmitting ? "Booking..." : "Confirm Appointment"}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
