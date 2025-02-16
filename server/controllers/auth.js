const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");




exports.registerUser = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
       console.log(req.body)
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      user = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });
  
      await user.save();
      console.log(user)
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };


  exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      // Generate JWT Token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  