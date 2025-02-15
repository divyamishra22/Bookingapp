const Business = require("../models/business");


exports.createBusiness = async (req, res) => {
  try {
    const { name, location, services, availability, contact } = req.body;
    const owner = req.user.id; 

    
    const gmbReferenceId = `gmb-${Date.now()}`; // Simulating a real ID

    
    const business = new Business({
      name,
      owner,
      location,
      services,
      availability,
      contact,
      gmbReferenceId, 
    });

    await business.save();

    res.status(201).json({ message: "Business created successfully!", business });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
