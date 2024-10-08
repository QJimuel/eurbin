const PlasticBottle = require('../models/plasticbottles');

// Get all plastic bottles
exports.getAllBottles = async (req, res) => {
    try {
        const bottles = await PlasticBottle.find();
        res.status(200).json({ message: 'Successfully retrieved data', bottles });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new plastic bottle entry
exports.createBottle = async (req, res) => {
    const { userId, Size, Code, date } = req.body;

    const newBottle = new PlasticBottle({ userId, Size,Code, date });
    try {
        const plasticBottle = await newBottle.save();
        res.status(201).json(plasticBottle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
