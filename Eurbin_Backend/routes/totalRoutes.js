const express = require('express');
const router = express.Router();
const totalController = require('../controllers/totalController');

router.get('/', totalController.getAllTotal);
router.post('/', totalController.createTotal);
router.get('/highest', totalController.getHighestTotal);
router.post('/update', totalController.updateTotal); 

module.exports = router;
