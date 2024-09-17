const express = require('express');
const router = express.Router();
const plasticBottleController = require('../controllers/plasticBottleController');

router.get('/', plasticBottleController.getAllBottles);
router.post('/', plasticBottleController.createBottle);

module.exports = router;
