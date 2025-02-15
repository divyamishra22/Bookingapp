const mongoose = require("mongoose");


const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location: { type: String, required: true },
  services: { type: String, required: true }, // Changed from Array to String
  availability: [
    {
      date: String, // e.g., "2025-02-18"
      slots: [String], // e.g., ["10:00 AM", "2:00 PM"]
    },
  ],
  contact: { type: String, required: true },
  gmbReferenceId: { type: String, required: false },
});



module.exports = mongoose.model("Business", BusinessSchema);
