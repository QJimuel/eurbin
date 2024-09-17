const Total = require('../models/total');
const updateTotal = require('../utils/updateTotal');

// Other functions...

// Update total
exports.updateTotal = async (req, res) => {
    try {
        await updateTotal();
        res.status(200).json({ message: 'Totals updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all transactions
exports.getAllTotal = async (req, res) => {
    try {
        const total = await Total.find();
        res.status(200).json({ message: 'Successfully retrieved data', total });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new transaction
exports.createTotal = async (req, res) => {
    const { totalUser,totalSmartPoints,totalBottle,totalCo2 ,date} = req.body;

    const now = new Date();

    // Add 8 hours
    const adjustedDate = new Date(now.getTime() + (8 * 60 * 60 * 1000));

    const newTotal = new Total({ totalUser,totalSmartPoints,totalBottle,totalCo2,date: adjustedDate  });
    try {
        const total = await newTotal.save();
        res.status(201).json(total);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getHighestTotal = async (req, res) => {
    try {
        const highestTotals = await Total.aggregate([
            {
                $group: {
                    _id: null,
                    highestTotalUser: { $max: "$totalUser" },
                    highestTotalSmartPoints: { $max: "$totalSmartPoints" },
                    highestTotalBottle: { $max: "$totalBottle" },
                    highestTotalCo2: { $max: "$totalCo2" }
                }
            }
        ]);

        if (highestTotals.length > 0) {
            res.status(200).json({ message: 'Successfully retrieved highest values', highestTotals: highestTotals[0] });
        } else {
            res.status(404).json({ message: 'No data found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};