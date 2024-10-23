const express = require('express');
const router = express.Router();
const rankController = require('../controllers/rankController');

router.get('/',rankController.getAllRank);
router.post('/', rankController.createRank);
router.get('/:id', rankController.getUserRanks);

module.exports = router;
