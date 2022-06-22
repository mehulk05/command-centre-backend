const express = require('express');
const FilterController = require('../controller/dashboard-data');
const router = express.Router();

router.post('/filter',FilterController.postFilter);
router.get('/filters',FilterController.getAllFilter);
module.exports = router;