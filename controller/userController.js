const User = require("../model/userModel");
const bcrypt = require('bcrypt');

const userLogin = async (req,res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await User.find(email);
        if (!user) {
            return res.status(404).json({message:"User not found, please sign up"})
        }
    } catch (error) {
        
    }
}

const userSignUp = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already exists' });
        }
        const hasedPassword = await bcrypt.hash(password, 10);
        console.log(hasedPassword)
        const user = new User({
            name,
            email,
            password: hasedPassword,
            role
        })
        await user.save();

        return res.status(201).json({ message: "user created successfully" });
        
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports = {
    userSignUp
}