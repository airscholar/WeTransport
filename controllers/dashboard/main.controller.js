const moment = require("moment");
const DriverModel = require("../../database/models/driver.model");
const ErrorResponse = require("../../utilities/errorResponse.helper");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const { asyncHandler } = require("../../middlewares/asyncHandler.middleware");

const { loadDriverList, loadDriverEdit, driverUpdate, deleteDriver, loadDriverAdd, addDriver } = require("./driver.controller");

const loadShipmentList = (req, res) => {
  res.render("dashboard/shipment_list", {
    layout: "layouts/layout_main",
    title: "Shipments | We Transport",
    date: moment(new Date()).format("DD-MM-YYYY"),
  });
};
const loadShipmentAdd = (req, res) => {
  res.render("dashboard/shipment_add", {
    layout: "layouts/layout_main",
    title: "Shipments | We Transport",
    date: moment(new Date()).format("DD-MM-YYYY"),
  });
};
const loadCourierList = (req, res) => {
  res.render("dashboard/courier_list", {
    layout: "layouts/layout_main",
    title: "Shipments | We Transport",
    date: moment(new Date()).format("DD-MM-YYYY"),
  });
};
const loadCourierAdd = (req, res) => {
  res.render("dashboard/courier_add", {
    layout: "layouts/layout_main",
    title: "Shipments | We Transport",
    date: moment(new Date()).format("DD-MM-YYYY"),
  });
};

module.exports = {
  loadShipmentList,
  loadShipmentAdd,
  loadCourierList,
  loadCourierAdd,
  loadDriverList,
  loadDriverAdd,
  loadDriverEdit,
  addDriver,
  driverUpdate,
  deleteDriver,
};
