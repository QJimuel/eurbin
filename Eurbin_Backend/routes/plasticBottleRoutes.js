const express = require('express');
const router = express.Router();
const plasticBottleController = require('../controllers/plasticBottleController');

const authenticateToken = require('../middlewares/authMiddleware');

router.get('/',authenticateToken, plasticBottleController.getAllBottles);
router.post('/', plasticBottleController.createBottle);

module.exports = router;
