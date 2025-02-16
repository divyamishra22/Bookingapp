import { useState } from "react";
import "./Styles/CreateBusiness.css";
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
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!business.name.trim()) errors.name = "Business name is required";
    if (!business.location.trim()) errors.location = "Location is required";
    if (!business.services.trim()) errors.services = "Service is required";
    if (!business.contact.trim()) errors.contact = "Contact number is required";
    else if (!/^\d{10}$/.test(business.contact))
      errors.contact = "Contact number must be 10 digits";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateTimeSlots = (slots) => {
    return slots.split(",").every((slot) => /^[0-1]\d:[0-5]\d(AM|PM)$/.test(slot.trim()));
  };

  const handleChange = (e) => {
    setBusiness({ ...business, [e.target.name]: e.target.value });
  };

  const addAvailability = () => {
    let tempErrors = {};

    if (!newDate) {
      tempErrors.newDate = "Please select a date from the calendar.";
    }

    if (!newSlots || !validateTimeSlots(newSlots)) {
      tempErrors.newSlots = "Time must be in hh:mmAM/PM format (e.g., 10:00AM, 03:30PM)";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    const slotsArray = newSlots.split(",").map((slot) => slot.trim());
    setBusiness((prev) => ({
      ...prev,
      availability: [...prev.availability, { date: newDate, slots: slotsArray }],
    }));

    setNewDate("");
    setNewSlots("");
    setErrors({});
  };

  const linkGMB = () => {
    if (!business.name || !business.location || !business.services || !business.contact) {
      alert("Fill all business details before linking GMB.");
      return;
    }
    setBusiness((prev) => ({
      ...prev,
      gmbReferenceId: `gmb-${Date.now()}`,
    }));
    alert("Successfully Linked");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://bookingapp-server-henna.vercel.app/business",
        business,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Business Created:", response.data);
    } catch (error) {
      console.log("Failed to create business." + error.stack);
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
          <input
            type="text"
            name="name"
            placeholder="Business Name"
            value={business.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={business.location}
            onChange={handleChange}
            required
          />
          {errors.location && <p className="error">{errors.location}</p>}

          <input
            type="text"
            name="services"
            placeholder="Service Offered"
            value={business.services}
            onChange={handleChange}
            required
          />
          {errors.services && <p className="error">{errors.services}</p>}

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={business.contact}
            onChange={handleChange}
            required
          />
          {errors.contact && <p className="error">{errors.contact}</p>}
        </div>

        <button
          className="gmb-button"
          onClick={linkGMB}
          disabled={!business.name || !business.location || !business.services || !business.contact}
        >
          Link Google My Business
        </button>

        <h3>Availability</h3>
        <div className="availability-section">
          {/* Calendar View for Date Selection */}
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            required
          />
          {errors.newDate && <p className="error">{errors.newDate}</p>}

          <input
            type="text"
            placeholder="Time Slots (e.g., 10:00AM, 03:30PM)"
            value={newSlots}
            onChange={(e) => setNewSlots(e.target.value)}
            required
          />
          {errors.newSlots && <p className="error">{errors.newSlots}</p>}

          <button className="add-availability" onClick={addAvailability}>
            Add Availability
          </button>
        </div>

        <ul className="availability-list">
          {business.availability.map((slot, index) => (
            <li key={index}>
              {slot.date}: {slot.slots.join(", ")}
            </li>
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
