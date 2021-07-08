const DriverModel = require("../../database/models/driver.model");
const shipmentModel = require("../../database/models/shipment.model");
const ErrorResponse = require("../../utilities/errorResponse.helper");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const { asyncHandler } = require("../../middlewares/asyncHandler.middleware");
const moment = require("moment");
const driverModel = require("../../database/models/driver.model");

/////////DRIVERS
const loadDriverList = asyncHandler(async (req, res) => {
  const drivers = await DriverModel.find();
  res.render("dashboard/driver/driver_list", {
    layout: "layouts/layout_main",
    title: "Drivers | We Transport",
    date: moment().format("LLLL"),
    driversList: drivers,
    user: req.user,
  });
});
const loadDriverEdit = asyncHandler(async (req, res) => {
  const { driver_id } = req.params;
  const driver = await DriverModel.findById(driver_id);

  if (!driver) return res.status(StatusCodes.NOT_FOUND).json({ message: "Driver Not Found" });

  res.render("dashboard/driver/driver_edit", {
    layout: "layouts/layout_main",
    title: "Drivers | We Transport",
    date: moment().format("LLLL"),
    driver: driver,
    user: req.user,
  });
});

const deleteDriver = asyncHandler(async (req, res) => {
  const { driver_id } = req.params;
  const driver = await DriverModel.findById(driver_id);

  if (!driver) return res.status(StatusCodes.NOT_FOUND).json({ message: "Driver Not Found" });

  driver.remove();

  res.status(StatusCodes.OK).json({ message: "Driver removed successfully!" });
});

const driverUpdate = asyncHandler(async (req, res) => {
  const { driver_id } = req.params;
  let driver = await DriverModel.findById(driver_id);
  if (!driver) return res.status(StatusCodes.NOT_FOUND).json({ message: "Driver Not Found" });

  let updated_driver;
  try {
    updated_driver = await DriverModel.findByIdAndUpdate(driver_id, req.body, { new: true, runValidators: true });
  } catch (err) {
    return res.status(StatusCodes.OK).json({ message: "Driver update failed!", err });
  }
  res.status(StatusCodes.OK).json({ message: "Driver updated Successfully!", updated_driver });
});

const loadDriverAdd = asyncHandler(async (req, res) => {
  res.render("dashboard/driver/driver_add", {
    layout: "layouts/layout_main",
    title: "Drivers | We Transport",
    date: moment().format("LLLL"),
    user: req.user,
  });
});

const addDriver = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  const driver = await DriverModel.create(req.body);

  if (!driver) {
    return new ErrorResponse("Unable to create a driver", StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return res.status(StatusCodes.CREATED).json({
    message: "Driver Profile Created!",
    result: driver,
  });
});

const loadDriverEnroute = asyncHandler(async (req, res) => {
  const { tracking_id } = req.params;
  const shipment = await shipmentModel.findOne({ order_number_tracking: tracking_id.substr(3, tracking_id.length - 1) });

  const driver = await driverModel.findOne({ first_name: shipment.assigned_driver.split(" ")[0], last_name: shipment.assigned_driver.split(" ")[1] });
  if (!shipment) return res.status(StatusCodes.NOT_FOUND).json({ message: "shipment Not Found" });

  res.render("dashboard/driver/driver_enroute", {
    layout: "layouts/layout_tracker",
    title: "Drivers | We Transport",
    date: moment().format("LLLL"),
    driver: driver,
    user: req.user,
    shipment,
  });
});

module.exports = {
  loadDriverList,
  loadDriverEdit,
  driverUpdate,
  loadDriverAdd,
  addDriver,
  deleteDriver,
  loadDriverEnroute,
};
