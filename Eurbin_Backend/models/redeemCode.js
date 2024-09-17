const mongoose = require('mongoose');
const redeemCodeSchema = new mongoose.Schema({
  userId: Number,
   redeemCode: String,
   smartPoints: Number,
   isRedeemed: Boolean
   

 });
 module.exports = mongoose.model('RedeemCode', redeemCodeSchema, 'redeemCode');
