// routes/rewardRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

console.log('User Routes Loaded');

// Route to get all rewards
router.get('/', userController.getAllUsers);

// Route to get a specific reward by ID
router.get('/:id', userController.getUserById);

// Route to create a new reward
router.post('/', userController.createUser);

// Route to update a reward by ID
router.put('/update-password', userController.updatePassword);

router.put('/:id', userController.updateUser);



// Route to delete a reward by ID
router.delete('/:id',userController.deleteUser);

router.post('/login', userController.loginUser);




module.exports = router;
