const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const adminAuthMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware =  require('../middlewares/authMiddleware');


router.get('/',authMiddleware, contentController.getAllContents);
router.post('/',adminAuthMiddleware, contentController.createContent);
router.patch('/:contentId',adminAuthMiddleware, contentController.updateContent);
router.patch('/disable/:contentId',adminAuthMiddleware, contentController.disableContent);
router.delete('/:contentId',adminAuthMiddleware,  contentController.deleteContent);



module.exports = router;
