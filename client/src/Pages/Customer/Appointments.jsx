import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Styles/Appointments.css";

const BookAppointment = () => {
  const { gmbReferenceId } = useParams(); // Get gmbReferenceId from URL
  const navigate = useNavigate();
  const location = useLocation();
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = location.state?.service || "";
  const availability = location.state?.availability || [];

  // Get available slots based on selected date
  const availableSlots = availability.find((item) => item.date === date)?.slots || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")); // Parse stored user object

    const appointmentData = {
      user: user._id,
      service: services,
      date,
      time: selectedTime,
      status: "pending",
      gmbReferenceId,
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

      console.log("Appointment Booked:", response.data);
      navigate(`/viewall`); // Redirect after booking
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
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Select Time:</label>
        {availableSlots.length > 0 ? (
          <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required>
            <option value="">Select a time</option>
            {availableSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        ) : (
          <p>No available slots for the selected date.</p>
        )}

        <button type="submit" disabled={isSubmitting || !selectedTime}>
          {isSubmitting ? "Booking..." : "Confirm Appointment"}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
