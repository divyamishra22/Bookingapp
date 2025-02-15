import { useState } from "react";
//import axios from "axios";
//import { useNavigate } from "react-router-dom";
import "./CreateBusiness.css";

const CreateBusiness = () => {
  const [business, setBusiness] = useState({
    name: "",
    location: "",
    service: "",
    ownerName: "",
    contact: "",
    gmbReferenceId: "",
    availability: [],
  });

  const [newDate, setNewDate] = useState("");
  const [newSlots, setNewSlots] = useState("");

  //const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
      alert("Business created successfully!");
   
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create business");
    }
  };

  return (
    <div className="business-container">
      <div className="business-box">
        <h2>Create Your Business</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Business Name" value={business.name} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={business.location} onChange={handleChange} required />
          <input type="text" name="service" placeholder="Service Offered" value={business.service} onChange={handleChange} required />
          <input type="text" name="ownerName" placeholder="Owner Name" value={business.ownerName} onChange={handleChange} required />
          <input type="text" name="contact" placeholder="Contact Number" value={business.contact} onChange={handleChange} required />


          <h3>Availability</h3>
          <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} required />
          <input type="text" placeholder="Time Slots (comma separated)" value={newSlots} onChange={(e) => setNewSlots(e.target.value)} required />
          <button type="button" onClick={addAvailability} className="add-availability">
            Add Availability
          </button>

          <ul>
            {business.availability.map((slot, index) => (
              <li key={index}>
                {slot.date}: {slot.slots.join(", ")}
              </li>
            ))}
          </ul>

          <button type="submit">Create Business</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBusiness;
