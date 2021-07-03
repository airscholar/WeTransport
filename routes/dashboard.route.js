const express = require('express');

const router = express.Router();

const { dashboardController } = require('../controllers/index');

/* GET login home page. */
router.route('/').get(dashboardController.loadDashboard);

module.exports = router;
