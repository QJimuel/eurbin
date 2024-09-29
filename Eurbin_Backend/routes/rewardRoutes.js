const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');

// Log when routes are loaded
console.log('Reward Routes Loaded');

// Route to get all rewards
router.get('/', rewardController.getAllRewards);

// Route to get a specific reward by ID
router.get('/:id', rewardController.getRewardById);

// Route to create a new reward with image upload
router.post('/', rewardController.upload, rewardController.createReward); // Use multer middleware for file upload

// Route to update a reward by ID with image upload
router.put('/:id', rewardController.upload, rewardController.updateReward); // Use multer middleware for file upload

// Route to delete a reward by ID
router.delete('/:id', rewardController.deleteReward);

module.exports = router;
