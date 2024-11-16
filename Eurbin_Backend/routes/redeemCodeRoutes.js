const express = require('express');
const router = express.Router();
const redeemCodeController = require('../controllers/redeemCodeController');
const adminAuthMiddleware = require('../middlewares/adminMiddleware'); 
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/',adminAuthMiddleware, redeemCodeController.getAllCode);
router.post('/', redeemCodeController.createCode);
router.put('/',authenticateToken, redeemCodeController.redeemCode)

module.exports = router;
