const mongoose = require('mongoose');
const RankSchema = new mongoose.Schema({
   userId: String,
   rank: String,
   date: Date
   

 });
 module.exports = mongoose.model('Rank', RankSchema, 'rank');
