const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const adminAuthMiddleware = require('../middlewares/adminMiddleware'); 



router.get('/', rewardController.getAllRewards);

router.get('/:id', rewardController.getRewardById);

router.patch('/:id', rewardController.updateReward2)

router.put('/:id',adminAuthMiddleware ,rewardController.upload, rewardController.updateReward); 

router.post('/', adminAuthMiddleware,rewardController.upload, rewardController.createReward); 

router.delete('/:id',adminAuthMiddleware, rewardController.deleteReward); 

module.exports = router;
