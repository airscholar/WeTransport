const moment = require("moment");
const ErrorResponse = require("../../utilities/errorResponse.helper");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const { asyncHandler } = require("../../middlewares/asyncHandler.middleware");
const CustomerModel = require("../../database/models/customer.model");

const loadCourierList = (req, res) => {
  res.render("dashboard/courier/courier_list", {
    layout: "layouts/layout_main",
    title: "Shipments | We Transport",
    date: moment().format("LLLL"),
    user: req.user,
  });
};
const loadCourierAdd = (req, res) => {
  res.render("dashboard/courier/courier_add", {
    layout: "layouts/layout_main",
    title: "Shipments | We Transport",
    date: moment().format("LLLL"),
    user: req.user,
  });
};

module.exports = {
  loadCourierList,
  loadCourierAdd,
};
