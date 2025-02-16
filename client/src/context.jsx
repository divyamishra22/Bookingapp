import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    try {
      const { data } = await axios.post(
        "https://bookingapp-server-jm2z.onrender.com/auth/login",
        { email, password }, // Sending destructured email & password
        { headers: { "Content-Type": "application/json" } }
      );

      const { user, token } = data; // Extract user and token
       console.log(user)
      if (!user || !user.name || !user.email || !user.role) {
        throw new Error("Invalid user data received");
      }

      setUser(user);
      setToken(token);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (user.role === "owner") {
        navigate("/business");
      } else {
        navigate("/view");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
