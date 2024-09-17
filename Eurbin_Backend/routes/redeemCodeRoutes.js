const express = require('express');
const router = express.Router();
const redeemCodeController = require('../controllers/redeemCodeController');

router.get('/', redeemCodeController.getAllCode);
router.post('/', redeemCodeController.createCode);
router.put('/', redeemCodeController.redeemCode)

module.exports = router;
