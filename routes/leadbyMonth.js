const express = require('express');
const LeadByMonthController = require('../controller/leadsByMonth');
const router = express.Router();

router.post('/leadbymonth',LeadByMonthController.postLeadByMonth);
router.get('/leadsbymonth',LeadByMonthController.getAllLeadsByMonth);
module.exports = router;