
const mongoose = require('mongoose');
const rewardSchema = new mongoose.Schema({
   RewardName: String,
   Category: String,
   Quantity: Number,
   Price: Number,
   Image: String
   
   

 });
 module.exports = mongoose.model('Reward', rewardSchema, 'rewards');
