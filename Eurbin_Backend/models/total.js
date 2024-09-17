const mongoose = require('mongoose');
const totalSchema = new mongoose.Schema({
    totalUser: Number,
    totalSmartPoints: Number,
   totalBottle: Number,
   totalCo2: Number,
   date: {
    type: Date,
    default: Date.now  // Automatically set to the current date and time
  }
  
   

 });
 module.exports = mongoose.model('Total', totalSchema, 'totals');
  