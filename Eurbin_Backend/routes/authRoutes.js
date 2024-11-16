// In your adminRoutes.js
const express = require('express');
const adminController = require('../controllers/adminController');
const adminAuthMiddleware = require('../middlewares/adminMiddleware');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/',adminAuthMiddleware,adminController.getAllAdmins)
router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.patch('/update-profile',authenticateToken, adminController.updateProfile); 
router.patch('/change-password',authenticateToken, adminController.changePassword);
router.get('/verify-email', adminController.verifyEmail);
// Add this route

module.exports = router;
