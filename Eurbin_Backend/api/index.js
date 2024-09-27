const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import routes
const transactionRoutes = require('../routes/transactionRoutes');
const rewardRoutes = require('../routes/rewardRoutes');
const plasticBottleRoutes = require('../routes/plasticBottleRoutes');
const authRoutes = require('../routes/authRoutes');
const redeemCodeRoutes = require('../routes/redeemCodeRoutes');
const userRoutes = require('../routes/userRoutes');
const totalRoutes = require('../routes/totalRoutes');
const contentRoutes = require('../routes/contentRoutes')

const app = express();

const corsOptions = {
    origin: ['https://eurbinadmin.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));


app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', ['https://eurbinadmin.vercel.app','http://localhost:5173','http://localhost:8081' ]);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200); // Send OK response
});

app.use(bodyParser.json());

// MongoDB connection
const Connection_String = "mongodb+srv://JQuerel:JQuerel@eurbin.th0jg.mongodb.net/EURBin?retryWrites=true&w=majority";

mongoose.connect(Connection_String)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB Atlas', err));

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the EURBin Backend! This server manages user transactions, rewards, plastic bottle identification, and code redemption processes. Stay tuned for more updates.');
});

app.use('/test', (req, res) => res.send('Test route working!'));

app.use('/rewards', rewardRoutes);
app.use('/transactions', transactionRoutes);
app.use('/bottles', plasticBottleRoutes);
app.use('/admin', authRoutes);
app.use('/code', redeemCodeRoutes);
app.use('/user', userRoutes);
app.use('/total', totalRoutes);
app.use('/contents', contentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Internal Server Error:', err);
    res.status(500).send('Internal Server Error');
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
