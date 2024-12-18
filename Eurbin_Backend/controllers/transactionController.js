const Transaction = require('../models/transaction');
const nodemailer = require('nodemailer');
const User = require('../models/user');

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

exports.createTransaction = async (req, res) => {
    const { userId, transactionName, transactionPrice, isAccepted } = req.body;

    const now = new Date();
    const adjustedDate = new Date(now.getTime());

    try {
        const latestTransaction = await Transaction.findOne().sort({ referenceNo: -1 });

        let nextRefNo = 1000;
        if (latestTransaction && latestTransaction.referenceNo) {
            const latestRefNo = parseInt(latestTransaction.referenceNo.split('-')[1]);
            nextRefNo = latestRefNo + 1;
        }

        const newReferenceNo = `Y24-${nextRefNo}`;

        const newTransaction = new Transaction({
            userId,
            transactionName,
            transactionPrice,
            referenceNo: newReferenceNo,
            isAccepted,
            date: adjustedDate
        });

        const transaction = await newTransaction.save();

        // Find the user by userId from the request body
        const user = await User.findOne({ userId: userId });

        // Check if the user exists and has an email
        if (user && user.email) {
            // Send the email asynchronously
            await sendEmail(user.email,transactionName, newReferenceNo);
        }

        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Async function to send the email
const sendEmail = async (recipientEmail, transactionName, referenceNo) => {
    console.log(`Sending email to: ${recipientEmail}`); // Log the recipient's email

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'eurbinmmq@gmail.com', // Your email
            pass: 'mwqy dmwx myrn ngny'  // Your email app-specific password
        },
    });

    const mailOptions = {
        from: 'eurbinmmq@gmail.com', // Sender address
        to: recipientEmail,          // Recipient's email address
        subject: 'Reward Claim Notification',
        text: `You are not allowed to claim the reward to HSO at this time.\n\nTransaction Details:\nTransaction Name: ${transactionName}\nReference Number: ${referenceNo}`
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.log('Error sending email:', error);
    }
};


