import { useEffect, useState } from "react";
import axios from "axios";
import "./Styles/Viwes.css";
import { useNavigate } from "react-router-dom";

const View = () => {
  const [businesses, setBusinesses] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get("https://bookingapp-servercheck.vercel.app/customer/limit", {
          headers: {
            "Authorization": token, // Send JWT in header
            "Content-Type": "application/json",
          },
        });
        console.log(response)
        setBusinesses(response.data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };
    fetchBusinesses();
  }, [token]);

  return (
    <div className="business-list-container">
      <h1>Available Businesses</h1>
      <div className="business-cards">
        {businesses.map((business) => (
          <div key={business._id} className="business-card">
            <h2>{business.name}</h2>
            <p><strong>Location:</strong> {business.location}</p>
            <p><strong>Services:</strong> {business.services}</p>
            <p><strong>Contact:</strong> {business.contact}</p>
            <button className="book-button" onClick={() => navigate(`/book-appointment/${business.gmbReferenceId}`, {
    state: { service: business.services, availibility: business.availability }
  })}>Book Appointment</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View;
