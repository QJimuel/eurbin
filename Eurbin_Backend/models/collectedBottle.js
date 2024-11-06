const mongoose = require('mongoose');
const collectedBottleSchema = new mongoose.Schema({
   bottleCount: Number,
   date: Date
   

 });
 module.exports = mongoose.model('CollectedBottle', collectedBottleSchema, 'collectedBottles');
