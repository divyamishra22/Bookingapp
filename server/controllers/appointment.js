const Appointment = require("../models/appointment");


exports.createAppointment = async (req, res) => {
  try {
    const { service, date, time, gmbReferenceId } = req.body;

    const appointment = new Appointment({
      user: req.user.id, 
      service,
      date,
      time,
      gmbReferenceId,
      status: "pending",
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
  }
};


exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};


exports.updateAppointment = async (req, res) => {
  try {
    const { date, time } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    if (appointment.user.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;
    await appointment.save();

    res.status(200).json({ message: "Appointment updated", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error });
  }
};


exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    if (appointment.user.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    await appointment.deleteOne();
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error });
  }
};
