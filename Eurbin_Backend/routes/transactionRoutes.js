const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Existing routes
router.get('/', transactionController.getAllTransactions);
router.post('/', transactionController.createTransaction);

// New route to update transaction status
router.put('/:transactionId', transactionController.updateTransactionStatus);

module.exports = router;


/*
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.getAllTransactions);
router.post('/', transactionController.createTransaction);

module.exports = router;
*/
