
const mongoose = require('mongoose');
const rewardSchema = new mongoose.Schema({
   RewardName: String,
   Category: String,
   Quantity: Number,
   Price: Number
   
   

 });
 module.exports = mongoose.model('Reward', rewardSchema, 'rewards');
