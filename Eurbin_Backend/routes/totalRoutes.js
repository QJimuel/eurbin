const express = require('express');
const router = express.Router();
const totalController = require('../controllers/totalController');
const adminAuthMiddleware = require('../middlewares/adminMiddleware'); 
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/',authenticateToken, totalController.getAllTotal);
router.post('/',adminAuthMiddleware, totalController.createTotal);
router.get('/highest',authenticateToken, totalController.getHighestTotal);
router.post('/update',adminAuthMiddleware, totalController.updateTotal); 

module.exports = router;
