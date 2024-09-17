// In your adminRoutes.js
const express = require('express');
const { register, login, verifyEmail, updateProfile ,changePassword } = require('../controllers/adminController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/update-profile', updateProfile); 
router.patch('/change-password', changePassword);
router.get('/verify-email', verifyEmail);
// Add this route

module.exports = router;
