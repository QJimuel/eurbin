const express = require('express');
const router = express.Router();
const redeemCodeController = require('../controllers/redeemCodeController');
const adminAuthMiddleware = require('../middlewares/adminMiddleware'); 

router.get('/',adminAuthMiddleware, redeemCodeController.getAllCode);
router.post('/', redeemCodeController.createCode);
router.put('/', redeemCodeController.redeemCode)

module.exports = router;
