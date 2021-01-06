const express = require('express')
const router = express.Router()

//Controller
const dashboardController = require('../controllers/dashboardController');

// define the dashboard page route
router.get('/', dashboardController.index);

module.exports = router;