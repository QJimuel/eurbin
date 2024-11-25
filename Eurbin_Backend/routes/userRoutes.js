// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

console.log('User Routes Loaded');

// Public Routes
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/verify-otp', userController.verifyOTP);


// Protected Routes
router.put('/update-password', authenticateToken,   userController.updatePassword);
router.get('/',authenticateToken,  userController.getAllUsers);//--
router.get('/:id',authenticateToken,  userController.getUserById); //--

router.put('/:id',authenticateToken ,userController.upload,userController.updateUser);
router.put('/reactivate/:id', authenticateToken, userController.reactivateUser);


router.delete('/:id', authenticateToken, userController.deleteUser); //--

router.post('/forgot-password', userController.forgotPassword);
module.exports = router;
