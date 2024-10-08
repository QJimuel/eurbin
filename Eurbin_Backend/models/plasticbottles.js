const mongoose = require('mongoose');
const plasticBottleSchema = new mongoose.Schema({
   userId: String,
   Size: String,
   Code: String,
   date: Date
   

 });
 module.exports = mongoose.model('PlasticBottle', plasticBottleSchema, 'plasticBottles');
