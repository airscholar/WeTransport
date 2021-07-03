const securityController = require("./security/security.controller");
const trackingController = require("./dashboard/tracking.controller");
const dashboardController = require("./dashboard/dashboard.controller");
const shipmentController = require("./dashboard/main.controller");
const customerController = require("./dashboard/customer.controller");

module.exports = {
  securityController,
  trackingController,
  dashboardController,
  shipmentController,
  customerController,
};
