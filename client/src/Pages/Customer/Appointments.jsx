import React, { useState , useEffect} from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Styles/Appointments.css";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");



const BookAppointment = () => {
  const { gmbReferenceId } = useParams(); // Get gmbReferenceId from URL
  
  const location = useLocation();
  const [date, setDate] = useState(""); // Selected date
  const [time, setTime] = useState(""); // Selected time
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();


  const services= location.state?.service || "";
  const availability = location.state?.availibility || [];
console.log(services)
//   // Extract available dates from availability array
  const availableDates = availability.map((item) => item.date);
   console.log(availableDates)

  // Get available slots for the selected date
   const availableSlots = availability.find((item) => item.date === date)?.slots || [];
   console.log(availableSlots)

  


  // useEffect(() => {
  //   socket.on("appointmentCreated", ({ date, time }) => {
  //     console.log("New appointment:", date, time);

  //     setBookedSlots((prev) => ({
  //       ...prev,
  //       [date]: prev[date] ? [...prev[date], time] : [time], // Store booked slots for that date
  //     }));
  //   });

  //   return () => {
  //     socket.off("appointmentCreated");
  //   };
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")); // Parse user object

    const appointmentData = {
      user: user._id,
      service: services,
      date,
      time,
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
      navigate("/viewall")
     
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
        
        {/* Select Available Date */}
        <label>Select Date:</label>
        <select value={date} onChange={(e) => setDate(e.target.value)} required>
          <option value="">Select a Date</option>
          {availableDates.map((dateOption, index) => (
            <option key={index} value={dateOption}>
              {dateOption}
            </option>
          ))}
        </select>

        
        <select value={time} onChange={(e) => setTime(e.target.value)} required disabled={!date}>
          <option value="">Select a Time</option>
          {availableSlots.map((timeOption, index) => (
            <option key={index} value={timeOption}>
              {timeOption}
            </option>
          ))}
        </select>



        <button type="submit" disabled={isSubmitting || !time}>
          {isSubmitting ? "Booking..." : "Confirm Appointment"}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
