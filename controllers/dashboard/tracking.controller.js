const { asyncHandler } = require("../../middlewares/asyncHandler.middleware");
const moment = require("moment");
const getTracking = asyncHandler(async function (req, res) {
  res.render("tracking", { layout: "layouts/layout_login.hbs", header_type: "login", date: moment().format("LLLL"), user: req.user });
});

const getTracker = asyncHandler(async function (req, res) {
  res.render("tracker", { layout: "layouts/layout_tracker.hbs", date: moment().format("LLLL"), user: req.user });
});

module.exports = {
  getTracking,
  getTracker,
};
