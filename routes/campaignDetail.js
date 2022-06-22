const express = require('express');
const CampaignDetailController = require('../controller/campaignDetail');
const router = express.Router();

router.post('/campaigndetail',CampaignDetailController.postCampaignDetail);
router.get('/list-campaign',CampaignDetailController.getAllCampaign);
module.exports = router;