const express = require('express');
const router = express.Router();
const rankController = require('../controllers/rankController');
const authMiddleware =  require('../middlewares/authMiddleware');

router.post('/', authMiddleware,rankController.createRank);
router.patch('/',authMiddleware, rankController.getUserRanks);

module.exports = router;
