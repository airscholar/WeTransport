const securityController = require('./security/security.controller');
const trackingController = require('./tracking/tracking.controller');
const dashboardController = require('./dashboard/dashboard.controller');
const shipmentController = require('./shipment/shipment.controller');

module.exports = {
  securityController,
  trackingController,
  dashboardController,
  shipmentController,
};
