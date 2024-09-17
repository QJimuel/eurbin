// routes/rewardRoutes.js

const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');

console.log('Reward Routes Loaded');

// Route to get all rewards
router.get('/', rewardController.getAllRewards);

// Route to get a specific reward by ID
router.get('/:id', rewardController.getRewardById);

// Route to create a new reward
router.post('/', rewardController.createReward);

// Route to update a reward by ID
router.put('/:id', rewardController.updateReward);

// Route to delete a reward by ID
router.delete('/:id', rewardController.deleteReward);

module.exports = router;
