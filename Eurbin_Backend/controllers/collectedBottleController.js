const CollectedBottle = require('../models/collectedBottle');

// Get all plastic bottles
exports.getAllCollectedBottles = async (req, res) => {
    try {
        const collectedBottles = await CollectedBottle.find();
        res.status(200).json({ message: 'Successfully retrieved data', collectedBottles });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new plastic bottle entry
exports.createCollectedBottle = async (req, res) => {
    const { bottleCount} = req.body;

    const now = new Date();
    const adjustedDate = new Date(now.getTime());

    const newCollectedBottle = new CollectedBottle({ bottleCount, date: adjustedDate });
    try {
        const collectedBottleBottle = await newCollectedBottle.save();
        res.status(201).json(collectedBottleBottle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
