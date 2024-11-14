// In your adminRoutes.js
const express = require('express');
const adminController = require('../controllers/adminController');
const adminAuthMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

router.get('/',adminAuthMiddleware,adminController.getAllAdmins)
router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.patch('/update-profile', adminController.updateProfile); 
router.patch('/change-password', adminController.changePassword);
router.get('/verify-email', adminController.verifyEmail);
// Add this route

module.exports = router;
