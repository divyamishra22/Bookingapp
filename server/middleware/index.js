const jwt = require("jsonwebtoken");
const User = require("../models/user");


exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.user = decoded;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user.role = user.role; // Attach role to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};


  exports.roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      }
      next();
    };
  };






// we need to check role from db agn , so for any protected route
// if simply we pass anything as role in req body it will be approved.
