const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const adminAuthMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware =  require('../middlewares/authMiddleware');

// Existing routes
router.get('/',authMiddleware, transactionController.getAllTransactions);
router.post('/',authMiddleware, transactionController.createTransaction);

// New route to update transaction status
router.put('/:transactionId', adminAuthMiddleware,transactionController.updateTransactionStatus);

module.exports = router;


/*
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.getAllTransactions);
router.post('/', transactionController.createTransaction);

module.exports = router;
*/
