const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const userSignUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already exists" });
    }
    const hasedPassword = await bcrypt.hash(password, 10);
    console.log(hasedPassword);
    const user = new User({
      name,
      email,
      password: hasedPassword,
      role,
    });
    await user.save();

    return res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found, please sign up" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 3600000,
    });
    const userDetails = {
      userId: user._id,
      userName:user.name,
      role:user.role
    }
    return res.status(200).json({ message: "LoggedIn successfully",user:userDetails});
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const isProtected = (req,res) => {
  try {
    return res.status(200).json({message:"Permission granted"})
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  userSignUp,
  userLogin,
  isProtected
};
