const Reward = require('../models/reward');
const multer = require('multer'); // Include multer for handling file uploads
const path = require('path');

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp to avoid filename conflicts
    }
});

const upload = multer({ storage });

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

// Create a new reward
exports.createReward = async (req, res) => {

    
    try {

        console.log("Request body:", req.body); // Log the request body
        console.log("Uploaded file:", req.file);
        const { RewardName, Category, Quantity, Price } = req.body;

        // Check if image file is present and save path in reward
        const imageUrl = req.file ? req.file.path : null;

        const newReward = new Reward({ RewardName, Category, Quantity, Price, Image: imageUrl });
        await newReward.save();
        res.status(201).json(newReward);
    } catch (err) {
        console.error("Error creating reward:", err);
        res.status(500).json({ error: 'An error occurred while creating the reward.' });
    }
};

// Update a reward
exports.updateReward = async (req, res) => {
    try {
        const { RewardName, Category, Quantity, Price } = req.body;

        // Check if image file is present and update path
        const imageUrl = req.file ? req.file.path : null;

        const reward = await Reward.findByIdAndUpdate(req.params.id, { RewardName, Category, Quantity, Price, Image: imageUrl }, { new: true });
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

// Export the upload middleware to be used in routes
exports.upload = upload.single('Image'); // 'Image' should match the name of the input field in your form
