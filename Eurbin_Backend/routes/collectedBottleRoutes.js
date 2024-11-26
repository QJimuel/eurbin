const express = require('express');
const router = express.Router();
const collectedBottleController = require('../controllers/collectedBottleController');
const adminAuthMiddleware = require('../middlewares/adminMiddleware'); 
const authenticateToken = require('../middlewares/authMiddleware');


router.get('/',authenticateToken, collectedBottleController.getAllCollectedBottles);
router.post('/',adminAuthMiddleware, collectedBottleController.createCollectedBottle);

module.exports = router;
