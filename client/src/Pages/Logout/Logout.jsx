import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1>Welcome to Our Platform</h1>
      <p>
        Explore businesses, find jobs that match your skills, and grab exciting offers.  
        We help you connect with the right opportunities effortlessly.
      </p>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
