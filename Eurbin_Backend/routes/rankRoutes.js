const express = require('express');
const router = express.Router();
const rankController = require('../controllers/rankController');

router.post('/', rankController.createRank);
router.patch('/', rankController.getUserRanks);

module.exports = router;
