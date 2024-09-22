const Transaction = require('../models/transaction');

// Update transaction status (Accept/Decline)
exports.updateTransactionStatus = async (req, res) => {
    const { transactionId } = req.params; // The transaction ID from the URL
    const { isAccepted } = req.body; // The new status (true for accept, false for decline)

    try {
        const transaction = await Transaction.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        transaction.isAccepted = isAccepted;
        const now = new Date();

    // Add 8 hours
        const adjustedDate = new Date(now.getTime());
        transaction.date = adjustedDate;
        await transaction.save(); // Save the updated transaction

        res.status(200).json({ message: 'Transaction status updated successfully', transaction });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Get all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json({ message: 'Successfully retrieved data', transactions });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new transaction
exports.createTransaction = async (req, res) => {
    const { userId, transactionName, transactionPrice, isAccepted } = req.body;

    // Get the current date and adjust for timezone
    const now = new Date();
    const adjustedDate = new Date(now.getTime());

    try {
        // Find the latest transaction to determine the next reference number
        const latestTransaction = await Transaction.findOne().sort({ referenceNo: -1 });

        // Extract the numeric part of the latest referenceNo and increment it
        let nextRefNo = 1000;
        if (latestTransaction && latestTransaction.referenceNo) {
            const latestRefNo = parseInt(latestTransaction.referenceNo.split('-')[1]);
            nextRefNo = latestRefNo + 1;
        }

        // Create the new reference number in the format Y24-XXXX
        const newReferenceNo = `Y24-${nextRefNo}`;

        // Create a new transaction
        const newTransaction = new Transaction({
            userId,
            transactionName,
            transactionPrice,
            referenceNo: newReferenceNo,
            isAccepted,
            date: adjustedDate
        });

       
        const transaction = await newTransaction.save();

        // Send the response with the created transaction
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


