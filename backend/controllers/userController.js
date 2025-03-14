const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const userResponse = { 
            id: user._id, 
            username: user.username, 
            email: user.email, 
            image: user.image 
        };
        res.status(200).json({ user: userResponse, token });
    } catch(error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};


const signupUser = async (req, res) => {
    try {
        const { username, email, password, image } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: `User already exists` });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const newUser = new User({ 
            username,
            email, 
            password: hashedPassword,
            image
        });

        await newUser.save();

        const userResponse = { 
            id: newUser._id, 
            username: newUser.username, 
            email: newUser.email, 
            image: newUser.image 
        };

        res.status(201).json({ message: "User created successfully", user: userResponse });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
}

module.exports = { getAllUsers, loginUser, signupUser, deleteUser };