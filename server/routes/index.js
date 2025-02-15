const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth");
const {authMiddleware, roleMiddleware} = require("../middleware/index")
const {createBusiness} = require("../controllers/business")
const {createAppointment, getAppointments, updateAppointment, deleteAppointment } = require("../controllers/appointment")
const ROLES = require("../utils/role")

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

//business routes

router.post("/business", authMiddleware, roleMiddleware([ROLES.BUSINESS_OWNER]), createBusiness);

//router.delete("/:businessId", authMiddleware, businessOwnerMiddleware, deleteBusiness);


//customer routes
router.post("/customers/appointments", authMiddleware, roleMiddleware([ROLES.CUSTOMER]), createAppointment);


router.get("/customers/appointments", authMiddleware, roleMiddleware([ROLES.CUSTOMER]), getAppointments);


router.put("/customers/appointments/:id", authMiddleware, roleMiddleware([ROLES.CUSTOMER]), updateAppointment);


router.delete("/customers/appointments/:id", authMiddleware, roleMiddleware([ROLES.CUSTOMER]), deleteAppointment);





module.exports = router;
