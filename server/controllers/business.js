const Business = require("../models/business");
const Appointment = require("../models/appointment")


exports.createBusiness = async (req, res) => {
  try {
    const { name, location, services, availability, contact,gmbReferenceId } = req.body;
    const owner = req.user.id; 
console.log("hi")
    const business = new Business({
      name,
      owner,
      location,
      services,
      availability,
      contact,
      gmbReferenceId, 
    });

    console.log(business)
  
    await business.save();

    res.status(201).json({ message: "Business created successfully!", business });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.searchBusinesses = async (req, res) => {
  try {
    const { query } = req.query; // Get search query from request

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    console.log(query)
    // Find businesses where the service field matches the search term (case-insensitive)
    const businesses = await Business.find({
      services: { $regex: query, $options: "i" } // Case-insensitive search
    });
    
    

    if (businesses.length === 0) {
       return res.status(404).json({ message: "No businesses found" });
    }

    res.json(businesses);
  } catch (error) {
    console.error("Error searching businesses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getBusinessAppointments = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token
    console.log(userId)
    const gmb = await Business.find({ owner: userId });

if (!gmb.length) {
  return res.status(404).json({ message: "No businesses found for this owner" });
}

// Extract all gmbReferenceIds from businesses
const gmbReferenceIds = gmb.map((g) => g.gmbReferenceId);

// Fetch appointments for all businesses
const appo = await Appointment.find({ gmbReferenceId: { $in: gmbReferenceIds } });

res.json(appo);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
}
;




exports.getBusiness = async (req, res) => {
  try {
    console.log("called")
    const businesses = await Business.find().limit(2); // Fetch first 4 businesses
    res.status(200).json(businesses);
  } catch (error) {
    console.error("Error fetching business appointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { gmbReferenceId } = req.body;

    if (!appointmentId || !gmbReferenceId) {
      return res.status(400).json({ message: "Appointment ID and GMB reference ID are required" });
    }

    // Find the appointment
    const appointment = await Appointment.findOne({ _id: appointmentId, gmbReferenceId });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found or unauthorized" });
    }

    // Update status to 'cancelled'
    appointment.status = "cancelled";
    await appointment.save();

    res.status(200).json({ message: "Appointment cancelled successfully", appointment });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};







