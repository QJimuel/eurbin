const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.get('/', contentController.getAllContents);
router.post('/', contentController.createContent);

module.exports = router;
