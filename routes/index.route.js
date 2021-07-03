const express = require('express');

const router = express.Router();

const { securityController, trackingController } = require('../controllers/index');

/* GET login home page. */
router.route('/').get(securityController.loadLogin);

/* GET registration page. */
router.route('/register').get(securityController.loadRegistration);

/* GET tracking page. */
router.route('/tracking').get(trackingController.getTracking);

module.exports = router;
