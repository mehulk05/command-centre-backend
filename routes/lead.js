const express = require('express');
const router = express.Router();
const LeadController = require('../controller/leads');
router.post("/lead",LeadController.postLead);
router.get('/leads',LeadController.getAllLeads);
router.post("/leadsFilter",LeadController.postLeadsAll);
router.get('/dashboard-list',LeadController.getdashboardData);
module.exports = router;