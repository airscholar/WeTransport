const moment = require("moment");
const ErrorResponse = require("../../utilities/errorResponse.helper");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const { asyncHandler } = require("../../middlewares/asyncHandler.middleware");
const CustomerModel = require("../../database/models/customer.model");
const shipmentModel = require("../../database/models/shipment.model");
const driverModel = require("../../database/models/driver.model");

const loadShipmentList = async (req, res) => {
  const shipmentLists = await shipmentModel.find();
  res.render("dashboard/shipment/shipment_list", {
    layout: "layouts/layout_main",
    title: "Shipments | We Transport",
    date: moment().format("LLLL"),
    user: req.user,
    shipmentLists,
  });
};

const loadShipmentEdit = asyncHandler(async (req, res) => {
  const { shipment_id } = req.params;
  let shipment = await shipmentModel.findById(shipment_id);
  const drivers = await driverModel.find();
  const driver = await driverModel.find({ first_name: shipment.first_name, last_name: shipment.last_name });
  if (!shipment) return res.status(StatusCodes.NOT_FOUND).json({ message: "Shipment Not Found" });

  res.render("dashboard/shipment/shipment_edit", {
    layout: "layouts/layout_main",
    title: "Shipments | We Transport",
    date: moment().format("LLLL"),
    shipment,
    user: req.user,
    drivers,
    driver,
  });
});

const updateShipment = asyncHandler(async (req, res) => {
  const { shipment_id } = req.params;
  let shipment = await shipmentModel.findById(shipment_id);
  if (!shipment) return res.status(StatusCodes.NOT_FOUND).json({ message: "Shipment Not Found" });

  let updated_shipment;
  try {
    updated_shipment = await shipmentModel.findByIdAndUpdate(shipment_id, req.body, { new: true, runValidators: true });
  } catch (err) {
    return res.status(StatusCodes.OK).json({ message: "Shipment update failed!", err });
  }
  res.status(StatusCodes.OK).json({ message: "Shipment updated Successfully!", updated_shipment });
});

const loadShipmentAdd = async (req, res) => {
  const drivers = await driverModel.find();
  res.render("dashboard/shipment/shipment_add", {
    layout: "layouts/layout_main",
    title: "Shipments | We Transport",
    date: moment().format("LLLL"),
    user: req.user,
    customer: {
      ...req.user._doc,
    },
    shipment: {
      shipment_prefix: "WET",
      order_number_tracking: getTrackingId(),
    },
    drivers,
  });
};

const getTrackingId = () => {
  const trackingId = new Date().getUTCMilliseconds();
  return trackingId;
};

const addShipment = asyncHandler(async (req, res) => {
  const { customer_id } = req.params;

  //   const customer = await customerModel.findById(customer_id);

  const shipment = await shipmentModel.create(req.body);

  if (!shipment) {
    return new ErrorResponse("Unable to create a shipment", StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return res.status(StatusCodes.CREATED).json({
    message: "Shipment Created!",
    result: shipment,
  });
});

const deleteShipment = asyncHandler(async (req, res) => {
  const { shipment_id } = req.params;
  const shipment = await shipmentModel.findById(shipment_id);

  if (!shipment) return res.status(StatusCodes.NOT_FOUND).json({ message: "Shipment Not Found" });

  shipment.remove();

  res.status(StatusCodes.OK).json({ message: "Shipment removed successfully!" });
});

const checkShipment = asyncHandler(async (req, res) => {
  const { tracking_id } = req.body;

  const shipment = await shipmentModel.find({ order_number_tracking: tracking_id.substr(3, tracking_id.length - 1) });

  if (!shipment) return res.status(StatusCodes.NOT_FOUND).json({ message: "Shipment Not Found" });

  res.status(StatusCodes.OK).json({ message: "Shipment retrieved successfully!", shipment });
});

module.exports = {
  loadShipmentList,
  loadShipmentAdd,
  loadShipmentEdit,
  addShipment,
  updateShipment,
  deleteShipment,
  checkShipment,
};
