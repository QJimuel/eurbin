// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const updateTotal = require('../utils/updateTotal');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable


const multer = require('multer');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');

// Configure AWS S3 Client
// Configure AWS S3 Client
const s3 = new S3Client({
    region: 'ap-southeast-2',  // Load from environment variables
    credentials: {
        accessKeyId: 'AKIAWMFUPPJEGS5A25OL', // Load from environment variables
        secretAccessKey: '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', // Load from environment variables
    },
});

// Set up multer to upload images to S3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'rurbin-reward-and-profile-images', // Your S3 bucket name
       
        key: (req, file, cb) => {
            const uniqueFilename = Date.now().toString() + path.extname(file.originalname); // Generate a unique filename
            cb(null, uniqueFilename);
        }
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // Max file size 10MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

exports.upload = upload.single('Image');


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
        const { userName, password, email, role, department, program, yearLevel, smartPoints, plasticBottle, rank, co2, accumulatedSP } = req.body;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userId: newUserId,
            userName,
            password: hashedPassword,
            email,
            role,
            department,
            program,
            yearLevel,
            smartPoints,
            plasticBottle,
            rank,
            co2,
            accumulatedSP,
            isActive: true,
            creationDate: new Date()
        }); 

        await newUser.save();
        await updateTotal();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const { userId, userName, email, smartPoints, plasticBottle, rank, co2, accumulatedSP } = req.body;

        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const imageUrl = req.file ? req.file.location : null;

        let updateData = { userName, email, smartPoints, plasticBottle, rank, co2, accumulatedSP,Image: imageUrl };
        const updatedUser = await User.findOneAndUpdate({ userId: userId }, updateData, { new: true });
        await updateTotal();
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Deactivate user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isActive = false;
        await user.save();
        await updateTotal();
        res.json({ message: 'User deactivated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// User login
exports.loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.isActive) {
            return res.status(403).json({ message: 'Account is deactivated' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user.userId }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update user password
exports.updatePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;
        const user = await User.findOne({ userId: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect old password' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
