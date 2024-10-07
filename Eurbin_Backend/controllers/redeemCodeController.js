const RedeemCode = require('../models/redeemCode');


exports.getAllCode = async (req, res) => {
    try {
        const redeemCode = await RedeemCode.find();
        res.status(200).json({ message: 'Successfully retrieved data', redeemCode });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


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



exports.redeemCode = async (req, res) => {
    const { redeemCode, userId } = req.body;

    try {
      
        const code = await RedeemCode.findOne({ redeemCode });

        if (!code) {
            return res.status(404).json({ message: 'Redeem code not found' });
        }


        if (code.isRedeemed) {
            return res.status(400).json({ message: 'This code has already been redeemed' });
        }

     
        code.userId = userId;
        code.isRedeemed = true;

     
        await code.save();

        res.status(200).json({ message: 'Code redeemed successfully', code });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
