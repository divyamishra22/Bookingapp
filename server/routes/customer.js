
const express = require("express");

const {authMiddleware, roleMiddleware} = require("../middleware/index")
const {createAppointment, getAppointments, updateAppointment, deleteAppointment } = require("../controllers/appointment")
const {searchBusinesses, getBusiness} = require("../controllers/business")
const ROLES = require("../utils/role")



const router = express.Router();


router.post("/appointments",authMiddleware, roleMiddleware([ROLES.CUSTOMER]),createAppointment);


router.get("/appointment",authMiddleware,roleMiddleware([ROLES.CUSTOMER]),  getAppointments);


router.put("appointments/:id",authMiddleware, roleMiddleware([ROLES.CUSTOMER]), updateAppointment);


router.delete("appointment/:id", authMiddleware, roleMiddleware([ROLES.CUSTOMER]), deleteAppointment);

router.get("/search", authMiddleware, roleMiddleware([ROLES.CUSTOMER]), searchBusinesses)
router.get("/limit", authMiddleware,roleMiddleware([ROLES.CUSTOMER]), getBusiness);

module.exports = router;