const Reward = require('../models/reward');
const multer = require('multer');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');

// Configure AWS S3 Client
// Configure AWS S3 Client
const s3 = new S3Client({
    region: process.env.AWS_REGION,  // Load from environment variables
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Load from environment variables
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Load from environment variables
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

// Get all rewards
exports.getAllRewards = async (req, res) => {
    try {
        const rewards = await Reward.find();
        console.log("Retrieved all rewards");

        res.status(200).json({ message: 'Successfully retrieved data', rewards });
    } catch (err) {
        console.error("Error retrieving rewards:", err);
        res.status(500).json({ error: 'An error occurred while fetching rewards.' });
    }
};

// Get reward by ID
exports.getRewardById = async (req, res) => {
    try {
        const reward = await Reward.findById(req.params.id);
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.status(200).json(reward);
    } catch (err) {
        console.error("Error fetching reward by ID:", err);
        res.status(500).json({ error: 'An error occurred while fetching the reward.' });
    }
};

// Create a reward
exports.createReward = async (req, res) => {
    try {
       

        const { RewardName, Category, Quantity, Price } = req.body;

        // Validate required fields
        if (!RewardName || !Category || !Quantity || !Price) {
            return res.status(400).json({ error: 'All fields are required (RewardName, Category, Quantity, Price)' });
        }

        // Handle the uploaded image file (S3 file URL)
        const imageUrl = req.file ? req.file.location : null;

        // Create a new reward
        const newReward = new Reward({
            RewardName,
            Category,
            Quantity,
            Price,
            Image: imageUrl
        });

        await newReward.save();

        res.status(201).json({
            message: 'Reward created successfully!',
            reward: newReward
        });
    } catch (err) {
        console.error("Error creating reward:", err);
        res.status(500).json({ error: 'An error occurred while creating the reward.' });
    }
};

// Update a reward
exports.updateReward = async (req, res) => {
    try {
        const { RewardName, Category, Quantity, Price } = req.body;

        // Handle the updated image file (if any)
        const imageUrl = req.file ? req.file.location : null;

        const reward = await Reward.findByIdAndUpdate(
            req.params.id,
            { RewardName, Category, Quantity, Price, Image: imageUrl },
            { new: true }
        );
        
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }

        res.status(200).json(reward);
    } catch (err) {
        console.error("Error updating reward:", err);
        res.status(500).json({ error: 'An error occurred while updating the reward.' });
    }
};

// Delete a reward
exports.deleteReward = async (req, res) => {
    try {
        const reward = await Reward.findByIdAndDelete(req.params.id);
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.status(200).json({ message: 'Reward deleted successfully' });
    } catch (err) {
        console.error("Error deleting reward:", err);
        res.status(500).json({ error: 'An error occurred while deleting the reward.' });
    }
};

// Export the upload middleware for routes
exports.upload = upload.single('Image'); // Ensure 'Image' matches the input field name in your form
