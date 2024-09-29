const RedeemCode = require('../models/redeemCode');

// Get all transactions
exports.getAllCode = async (req, res) => {
    try {
        const redeemCode = await RedeemCode.find();
        res.status(200).json({ message: 'Successfully retrieved data', redeemCode });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new transaction
exports.createCode = async (req, res) => {
    const { redeemCode, smartPoints } = req.body;
    console.log(redeemCode)

    const newRedeemCode = new RedeemCode({userId: null,redeemCode, smartPoints, isRedeemed: false });
    try {
        const redeemCode = await newRedeemCode.save();
      
        res.status(201).json(redeemCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Update userId and isRedeemed when a code is redeemed
exports.redeemCode = async (req, res) => {
    const { redeemCode, userId } = req.body;

    try {
        // Find the redeem code by the redeemCode value
        const code = await RedeemCode.findOne({ redeemCode });

        if (!code) {
            return res.status(404).json({ message: 'Redeem code not found' });
        }

        // Check if the code has already been redeemed
        if (code.isRedeemed) {
            return res.status(400).json({ message: 'This code has already been redeemed' });
        }

        // Update the userId and isRedeemed fields
        code.userId = userId;
        code.isRedeemed = true;

        // Save the updated code
        await code.save();

        res.status(200).json({ message: 'Code redeemed successfully', code });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
