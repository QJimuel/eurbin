const Rank = require('../models/rank');

// Get all plastic bottles
exports.getAllRank = async (req, res) => {
    try {
        const ranks = await Rank.find();
        res.status(200).json({ message: 'Successfully retrieved data', ranks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new plastic bottle entry
exports.createRank = async (req, res) => {
    const { userId, rank } = req.body;

    const now = new Date();
    const adjustedDate = new Date(now.getTime());

    const newRank = new Rank({ userId, rank,date: adjustedDate });
    try {
        const rank = await newRank.save();
        res.status(201).json(rank);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
