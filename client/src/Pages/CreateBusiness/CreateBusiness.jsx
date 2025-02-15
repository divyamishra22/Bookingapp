import { useState } from "react";
import "./CreateBusiness.css";
import axios from "axios";

const CreateBusiness = () => {
  const [business, setBusiness] = useState({
    name: "",
    location: "",
    services: "",
    contact: "",
    gmbReferenceId: "",
    availability: [],
  
  });

 const [newDate, setNewDate] = useState("");
  const [newSlots, setNewSlots] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setBusiness({ ...business, [e.target.name]: e.target.value });
  };

  const addAvailability = () => {
    if (!newDate || !newSlots) {
      alert("Please enter a valid date and time slots.");
      return;
    }

    const slotsArray = newSlots.split(",").map((slot) => slot.trim());
    setBusiness((prev) => ({
      ...prev,
      availability: [...prev.availability, { date: newDate, slots: slotsArray }],
    }));

    setNewDate("");
    setNewSlots("");
  };

  const linkGMB = () => {
    setBusiness((prev) => ({
      ...prev,
      gmbReferenceId: `gmb-${Date.now()}`,
    }));
    alert("Successfully Linked")
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
  console.log("Submitting business data:", business);

    try {
      const response = await axios.post(
        "http://localhost:5000/business",
        business,
        {
          headers: {
            "Authorization": token, // Send JWT in header
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Business Created:", response.data);
    } catch (error) {
      console.log("Failed to create business."+  error.stack);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="business-container">
      <div className="header">
        <h1>Register Your Business</h1>
        <p>Join the best platform to grow your business online.</p>
      </div>

      <div className="business-card">
        <h2>Business Details</h2>
        <div className="input-group">
          <input type="text" name="name" placeholder="Business Name" value={business.name} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={business.location} onChange={handleChange} required />
          <input type="text" name="services" placeholder="Service Offered" value={business.services} onChange={handleChange} required />
          <input type="text" name="contact" placeholder="Contact Number" value={business.contact} onChange={handleChange} required />
        </div>

        <button className="gmb-button" onClick={linkGMB} disabled={!business.name || !business.location || !business.services || !business.contact}>
          Link Google My Business
        </button>

         <h3>Availability</h3>
        <div className="availability-section">
          <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} required />
          <input type="text" placeholder="Time Slots (comma separated)" value={newSlots} onChange={(e) => setNewSlots(e.target.value)} required />
          <button className="add-availability" onClick={addAvailability}>
            Add Availability
          </button>
        </div> 

         <ul className="availability-list">
          {business.availability.map((slot, index) => (
            <li key={index}>{slot.date}: {slot.slots.join(", ")}</li>
          ))}
        </ul> 

        <button className="submit-button" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default CreateBusiness;
