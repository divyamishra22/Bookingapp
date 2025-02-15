import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import "./Appointments.css";

const Appointments = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  
  const availableSlots = ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleBookAppointment = () => {
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }
    const newAppointment = { date: date.toDateString(), time: selectedSlot };
    setAppointments([...appointments, newAppointment]);
    alert("Appointment booked successfully!");
    setSelectedSlot("");
  };

  const handleDeleteAppointment = (index) => {
    const updatedAppointments = [...appointments];
    updatedAppointments.splice(index, 1);
    setAppointments(updatedAppointments);
  };

  return (
    <div className="appointments-container">
      <h2>Book an Appointment</h2>
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={date} />
      </div>
      
      <h3>Available Slots for {date.toDateString()}:</h3>
      <div className="slots-container">
        {availableSlots.map((slot, index) => (
          <button
            key={index}
            className={selectedSlot === slot ? "slot selected" : "slot"}
            onClick={() => setSelectedSlot(slot)}
          >
            {slot}
          </button>
        ))}
      </div>
      
      <button className="book-btn" onClick={handleBookAppointment}>Book Appointment</button>
      
      <h3>Your Appointments</h3>
      <ul className="appointments-list">
        {appointments.map((appt, index) => (
          <li key={index}>
            {appt.date} at {appt.time}
            <button className="delete-btn" onClick={() => handleDeleteAppointment(index)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
