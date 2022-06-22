const express = require('express');
const RevenueSpentOnChannelController = require('../controller/revenueSpentOnChannel');
const router = express.Router();

router.post('/channel',RevenueSpentOnChannelController.postRevenueSpentOnChannel);
router.get('/channels',RevenueSpentOnChannelController.getAllRevenueSpentOnChannel);
module.exports = router;