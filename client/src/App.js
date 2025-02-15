
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import CreateBusiness from "./Pages/CreateBusiness/CreateBusiness";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/business" element={<CreateBusiness />} />
      </Routes>
    </Router>
  );
}

export default App;
