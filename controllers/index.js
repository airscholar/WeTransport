const securityController = require("./security/security.controller");
const trackingController = require("./dashboard/tracking.controller");
const dashboardController = require("./dashboard/dashboard.controller");
const shipmentController = require("./dashboard/shipment.controller");
const customerController = require("./dashboard/customer.controller");
const courierController = require("./dashboard/courier.controller");
const driverController = require("./dashboard/driver.controller");

module.exports = {
  securityController,
  trackingController,
  dashboardController,
  shipmentController,
  customerController,
  courierController,
  driverController,
};
