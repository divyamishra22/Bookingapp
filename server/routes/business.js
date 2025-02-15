
const express = require("express");
const {authMiddleware, roleMiddleware} = require("../middleware/index")
const {createBusiness, searchBusinesses, getBusinessAppointments, cancelAppointment} = require("../controllers/business")
const ROLES = require("../utils/role")


//business routes
const router = express.Router();

router.post("/", authMiddleware, roleMiddleware([ROLES.BUSINESS_OWNER]),  createBusiness);

router.get("/gmb", authMiddleware,roleMiddleware([ROLES.BUSINESS_OWNER]), getBusinessAppointments);








module.exports = router;