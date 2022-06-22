const express = require('express');
const RevenueSpentOnCampaignController = require('../controller/revenueSpentOnCampaign');
const router = express.Router();

router.post('/postrevenuespentoncampaign',RevenueSpentOnCampaignController.postLeadsOnCampaign);
router.get('/revenuespentoncampaign',RevenueSpentOnCampaignController.getAllRevenueSpentOnCampaign)
module.exports = router;