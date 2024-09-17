const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
   userId: String,
   transactionName: String,
   transactionPrice: Number,
   referenceNo: String,
   isAccepted: {
    type: Boolean,
    default: null  // Allow null as a default value
    },
    date: {
        type: Date,
        default: Date.now  // Automatically set to the current date and time
    }

 });
 module.exports = mongoose.model('Transaction', transactionSchema, 'transactions');
