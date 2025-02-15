const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth");
const {authMiddleware, businessOwnerMiddleware} = require("../middleware/index")
const {createBusiness} = require("../controllers/business")

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

//business routes

router.post("/", authMiddleware, businessOwnerMiddleware, createBusiness);




module.exports = router;
