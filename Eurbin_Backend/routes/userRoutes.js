// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

console.log('User Routes Loaded');

// Public Routes
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);

// Protected Routes
router.put('/update-password', authenticateToken,   userController.updatePassword);
router.get('/',authenticateToken,  userController.getAllUsers);
router.get('/:id',authenticateToken,  userController.getUserById);

router.put('/:id',authenticateToken ,userController.upload,userController.updateUser);

router.delete('/:id', authenticateToken, userController.deleteUser);


module.exports = router;
