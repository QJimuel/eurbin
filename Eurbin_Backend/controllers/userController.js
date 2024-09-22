// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const updateTotal = require('../utils/updateTotal');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Successfully retrieved data', users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const maxUser = await User.findOne().sort({ userId: -1 }).exec();
        const newUserId = maxUser ? maxUser.userId + 1 : 1;
        const { userName, password, email,department, program,yearLevel, smartPoints, plasticBottle, rank, co2,accumulatedSP } = req.body;

        const now = new Date();
        const adjustedDate = new Date(now.getTime());

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userId: newUserId,
            userName,
            password: hashedPassword,
            email,
            department, 
            program,
            yearLevel,
            smartPoints,
            plasticBottle,
            rank,
            co2,
            accumulatedSP,
            isActive: true,
            creationDate: adjustedDate
        });

        await newUser.save();

        // Update total after creating user
        await updateTotal();

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const { userId, userName, email, password, smartPoints, plasticBottle, rank, co2 ,accumulatedSP} = req.body;

        // Fetch the user from the database
        const user = await User.findOne({ userId: userId });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let updateData = { userName, email, smartPoints, plasticBottle, rank, co2,accumulatedSP };
      
        
        // Update user
        const updatedUser = await User.findOneAndUpdate(
            { userId: userId },
            updateData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update total after updating user
        await updateTotal();

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Set isActive to false instead of deleting the user
        user.isActive = false;
        await user.save();

        // Update total after deleting user
        await updateTotal();

        res.json({ message: 'User deactivated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Find the user by userName
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.isActive) {
            return res.status(403).json({ message: 'Account is deactivated' });
        }

        // Compare the password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If credentials are valid, you can respond with success or JWT token
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update password
exports.updatePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;

        // Find the user by userId
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the old password with the stored hashed password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect old password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
