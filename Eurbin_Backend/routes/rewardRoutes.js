const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const adminAuthMiddleware = require('../middlewares/adminMiddleware'); 
const authMiddleware =  require('../middlewares/authMiddleware');



router.get('/',authMiddleware, rewardController.getAllRewards);

router.get('/:id',authMiddleware, rewardController.getRewardById);

router.patch('/:id',authMiddleware, rewardController.updateReward2)

router.put('/:id',adminAuthMiddleware , rewardController.updateReward); 

router.post('/', adminAuthMiddleware,rewardController.upload, rewardController.createReward); 

router.delete('/:id',adminAuthMiddleware, rewardController.deleteReward); 

module.exports = router;
