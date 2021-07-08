const { asyncHandler } = require("../../middlewares/asyncHandler.middleware");
const moment = require("moment");
const shipmentModel = require("../../database/models/shipment.model");
const locationModel = require("../../database/models/location.model");
const { StatusCodes } = require("http-status-codes");
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

const getLocation = asyncHandler(async (req, res) => {
  const location = await locationModel.findOne({});

  return res.status(StatusCodes.OK).json({
    message: "Location retrieved successfully!",
    result: location,
  });
});
const setLocation = asyncHandler(async (req, res) => {
  const location = await locationModel.findOne({});
  if (!location) {
    const update_location = await locationModel.create(req.body);
    return res.status(StatusCodes.OK).json({
      message: "Location Updated successfully!",
      result: update_location,
    });
  }

  const update_location = await locationModel.findByIdAndUpdate(location._id, req.body, { new: true, runValidators: true });
  return res.status(StatusCodes.OK).json({
    message: "Location Updated successfully!",
    result: update_location,
  });
});

module.exports = {
  getTracking,
  getTracker,
  getLocation,
  setLocation,
};
