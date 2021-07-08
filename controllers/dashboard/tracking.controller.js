const { asyncHandler } = require("../../middlewares/asyncHandler.middleware");
const moment = require("moment");
const shipmentModel = require("../../database/models/shipment.model");
const getTracking = asyncHandler(async function (req, res) {
  res.render("tracking", { layout: "layouts/layout_login.hbs", header_type: "login", date: moment().format("LLLL"), user: req.user });
});

const getTracker = asyncHandler(async function (req, res) {
  const { tracking_id } = req.params;

  const shipment = await shipmentModel.findOne({ order_number_tracking: tracking_id.substr(3, tracking_id.length - 1) });

  res.render("tracker", {
    layout: "layouts/layout_tracker.hbs",
    date: moment().format("LLLL"),
    user: req.user,
    shipment: shipment,
  });
});

module.exports = {
  getTracking,
  getTracker,
};
