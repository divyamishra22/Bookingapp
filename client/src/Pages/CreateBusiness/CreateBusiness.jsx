import { useState } from "react";
import "./CreateBusiness.css";

const CreateBusiness = () => {
  const [business, setBusiness] = useState({
    name: "",
    location: "",
    service: "",
    ownerName: "",
    contact: "",
    gmbLinked: false, // Track if GMB is linked
    availability: [],
  });

  const [newDate, setNewDate] = useState("");
  const [newSlots, setNewSlots] = useState("");

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
    // Mock linking to GMB (No ID shown)
    setBusiness((prev) => ({ ...prev, gmbLinked: true }));
    alert("Google My Business linked successfully!");
  };

  const isFormComplete = business.name && business.location && business.service && business.ownerName && business.contact;

  return (
    <div className="business-container">
      <div className="business-card">
        <h2>Create Your Business</h2>
        <div className="input-group">
          <input type="text" name="name" placeholder="Business Name" value={business.name} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={business.location} onChange={handleChange} required />
          <input type="text" name="service" placeholder="Service Offered" value={business.service} onChange={handleChange} required />
          <input type="text" name="ownerName" placeholder="Owner Name" value={business.ownerName} onChange={handleChange} required />
          <input type="text" name="contact" placeholder="Contact Number" value={business.contact} onChange={handleChange} required />
        </div>

        <button className="gmb-button" onClick={linkGMB} disabled={!isFormComplete || business.gmbLinked}>
          {business.gmbLinked ? "GMB Linked ✔" : "Link Google My Business"}
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
      </div>
    </div>
  );
};

export default CreateBusiness;
