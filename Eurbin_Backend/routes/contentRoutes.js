const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.get('/', contentController.getAllContents);
router.post('/', contentController.createContent);
router.patch('/:contentId', contentController.updateContent);
router.patch('/disable/:contentId', contentController.disableContent);
router.delete('/:contentId',  contentController.deleteContent);



module.exports = router;
