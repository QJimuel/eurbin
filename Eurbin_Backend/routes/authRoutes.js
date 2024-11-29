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
router.post('/forgot-password', adminController.forgotPassword);


router.post('/notify-bin-full', async (req, res) => {
    try {
        await adminController.notifyAdminsBinFull(); // Call the function from the controller
        res.status(200).json({ message: 'Admins notified successfully.' });
    } catch (error) {
        console.error('Error notifying admins:', error);
        res.status(500).json({ message: 'Failed to notify admins.' });
    }
});

// Add this route

module.exports = router;
