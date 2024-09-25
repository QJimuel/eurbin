const mongoose = require('mongoose');
const contentSchema = new mongoose.Schema({
   contentId: Number,
   subject: String,
   description: String,
   isPosted: Boolean,
   date: Date
   

 });
 module.exports = mongoose.model('Content', contentSchema, 'contents');
