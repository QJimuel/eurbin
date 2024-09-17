// controllers/rewardController.js

const Reward = require('../models/reward');

// Get all rewards
exports.getAllRewards = async (req, res) => {
    try {
        const rewards = await Reward.find();
        console.log("nacall si reward get")
       
        res.status(200).json({ message: 'Successfully retrieved data', rewards });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get reward by ID
exports.getRewardById = async (req, res) => {
    try {
        const reward = await Reward.findById(req.params.id);
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.json(reward);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new reward
exports.createReward = async (req, res) => {
    try {
        const { RewardName, Category, Quantity, Price } = req.body;
       
        const newReward = new Reward({ RewardName, Category, Quantity, Price });
    
        await newReward.save();
        res.status(201).json(newReward);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a reward
exports.updateReward = async (req, res) => {
    try {
        const { RewardName, Category, Quantity, Price } = req.body;
        const reward = await Reward.findByIdAndUpdate(req.params.id, { RewardName, Category, Quantity, Price }, { new: true });
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.json(reward);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a reward
exports.deleteReward = async (req, res) => {
    try {
        const reward = await Reward.findByIdAndDelete(req.params.id);
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.json({ message: 'Reward deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
