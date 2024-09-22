const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
   userId: Number,
   userName: String,
   password: String,
   email: String,
   department: String,
   program: String,
   yearLevel: String,
   smartPoints: Number,
   plasticBottle: Number,
   rank: String,
   co2: Number,
   accumulatedSP: Number,
   isActive: Boolean,
   creationDate: Date

   

 });
 module.exports = mongoose.model('User', userSchema, 'users');
