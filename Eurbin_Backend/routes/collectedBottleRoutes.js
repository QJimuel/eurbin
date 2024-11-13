const express = require('express');
const router = express.Router();
const collectedBottleController = require('../controllers/collectedBottleController');
const adminAuthMiddleware = require('../middlewares/adminMiddleware'); 


router.get('/',adminAuthMiddleware, collectedBottleController.getAllCollectedBottles);
router.post('/',adminAuthMiddleware, collectedBottleController.createCollectedBottle);

module.exports = router;
