const express = require('express');
const RevenueSpentByMonthController = require('../controller/revenueSpentByMonth');
const router = express.Router();

router.post('/postrevenuebymonth',RevenueSpentByMonthController.postRevenueSpentByMonth);
router.get('/revenuesspentbymonth',RevenueSpentByMonthController.getAllRevenueSpentByMonths);
module.exports = router;