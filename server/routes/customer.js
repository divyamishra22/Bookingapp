
const express = require("express");

const {authMiddleware, roleMiddleware} = require("../middleware/index")
const {createAppointment, getAppointments, updateAppointment, deleteAppointment } = require("../controllers/appointment")
const {searchBusinesses} = require("../controllers/business")
const ROLES = require("../utils/role")



const router = express.Router();


router.post("/customers/appointments",authMiddleware, roleMiddleware([ROLES.CUSTOMER]),createAppointment);


router.get("/customers/appointments",authMiddleware,roleMiddleware([ROLES.CUSTOMER]),  getAppointments);


router.put("/customers/appointments/:id",authMiddleware, roleMiddleware([ROLES.CUSTOMER]), updateAppointment);


router.delete("/customers/appointments/:id", authMiddleware, roleMiddleware([ROLES.CUSTOMER]), deleteAppointment);

router.get("/search", authMiddleware, roleMiddleware([ROLES.CUSTOMER]), searchBusinesses)

module.exports = router;