const express = require('express');
const router = express.Router();
const plasticBottleController = require('../controllers/plasticBottleController');
const adminAuthMiddleware = require('../middlewares/adminMiddleware'); 

router.get('/',adminAuthMiddleware, plasticBottleController.getAllBottles);
router.post('/', plasticBottleController.createBottle);

module.exports = router;
