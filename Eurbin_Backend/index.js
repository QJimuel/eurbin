require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');

const transactionRoutes = require('./routes/transactionRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const plasticBottleRoutes = require('./routes/plasticBottleRoutes');
const authRoutes = require('./routes/authRoutes'); 
const redeemCodeRoutes = require('./routes/redeemCodeRoutes');
const userRoutes = require('./routes/userRoutes');
const totalRoutes =  require('./routes/totalRoutes');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Connection_String = process.env.MONGODB_URI;

mongoose.connect(Connection_String)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB Atlas', err);
    });

app.get('/', (req, res) => {
    res.send('Welcome to the EURBin Backend! This server manages user transactions, rewards, plastic bottle identification, and code redemption processes.');
});

app.use('/rewards', rewardRoutes);
app.use('/transactions', transactionRoutes);
app.use('/bottles', plasticBottleRoutes);
app.use('/admin', authRoutes);
app.use('/code', redeemCodeRoutes);
app.use('/user', userRoutes);
app.use('/total', totalRoutes);

module.exports = app;
