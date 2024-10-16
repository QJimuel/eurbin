const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');



router.get('/', rewardController.getAllRewards);

router.get('/:id', rewardController.getRewardById);

router.patch('/:id', rewardController.updateReward2)

router.put('/:id', rewardController.upload, rewardController.updateReward); 

router.post('/', rewardController.upload, rewardController.createReward);

router.delete('/:id', rewardController.deleteReward);

module.exports = router;
