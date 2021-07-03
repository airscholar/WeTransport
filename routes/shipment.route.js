const express = require('express');

const router = express.Router();

const { shipmentController } = require('../controllers/index');

/* GET login home page. */
router.route('/').get(shipmentController.loadShipment);

module.exports = router;
