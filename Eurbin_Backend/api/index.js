const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const transactionRoutes = require('../routes/transactionRoutes');
const rewardRoutes = require('../routes/rewardRoutes');
const plasticBottleRoutes = require('../routes/plasticBottleRoutes');
const authRoutes = require('../routes/authRoutes');
const redeemCodeRoutes = require('../routes/redeemCodeRoutes');
const userRoutes = require('../routes/userRoutes');
const totalRoutes = require('../routes/totalRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const Connection_String = process.env.MONGODB_URI || "mongodb+srv://JQuerel:JQuerel@eurbin.th0jg.mongodb.net/EURBin?retryWrites=true&w=majority";

mongoose.connect(Connection_String)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB Atlas', err);
    });

app.get('/', (req, res) => {
    res.send('Welcome to the EURBin Backend!');
});

app.use('/rewards', rewardRoutes);
app.use('/transactions', transactionRoutes);
app.use('/bottles', plasticBottleRoutes);
app.use('/admin', authRoutes);
app.use('/code', redeemCodeRoutes);
app.use('/user', userRoutes);
app.use('/total', totalRoutes);

// Export for Vercel Serverless Functions
module.exports = (req, res) => {
    app(req, res);
};
