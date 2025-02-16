
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register/Register";
import View from "./Pages/Customer/Views.jsx";
import Login from "./Pages/Login/Login";
import CreateBusiness from "./Pages/CreateBusiness/CreateBusiness";
import  AuthProvider  from "./context.jsx";
import BookAppointment from "./Pages/Customer/Appointments.jsx"
import Appointment from "./Pages/Customer/Viewall.jsx"
import Viewapp from "./Pages/CreateBusiness/View.jsx"

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/business" element={<CreateBusiness />} />
        <Route path="/view" element={< View/>} />
        <Route path="/book-appointment/:gmbReferenceId" element={<BookAppointment />} />
        <Route path="/viewall" element={< Appointment/>} />
        <Route path="/viewappointements" element={< Viewapp/>} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
