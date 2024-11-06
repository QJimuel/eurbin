const express = require('express');
const router = express.Router();
const collectedBottleController = require('../controllers/collectedBottleController');

router.get('/', collectedBottleController.getAllCollectedBottles);
router.post('/',collectedBottleController.createCollectedBottle);

module.exports = router;
