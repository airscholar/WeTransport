const moment = require("moment");
const ErrorResponse = require("../../utilities/errorResponse.helper");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const { asyncHandler } = require("../../middlewares/asyncHandler.middleware");
const CustomerModel = require("../../database/models/customer.model");

const loadCustomerList = asyncHandler(async (req, res) => {
  const customers = await CustomerModel.find();

  res.render("dashboard/customer/customer_list", {
    layout: "layouts/layout_main",
    title: "Customers | We Transport",
    date: moment(new Date()).format("DD-MM-YYYY"),
    customers: customers,
  });
});

const loadCustomerAdd = (req, res) => {
  res.render("dashboard/customer/customer_add", {
    layout: "layouts/layout_main",
    title: "Customers | We Transport",
    date: moment(new Date()).format("DD-MM-YYYY"),
  });
};

const addCustomer = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  const customer = await CustomerModel.create(req.body);

  if (!customer) {
    return new ErrorResponse("Unable to create a customer", StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return res.status(StatusCodes.CREATED).json({
    message: "Customer Profile Created!",
    result: customer,
  });
});

const loadCustomerEdit = asyncHandler(async (req, res) => {
  const { customer_id } = req.params;
  let customer = await CustomerModel.findById(customer_id);
  if (!customer) return res.status(StatusCodes.NOT_FOUND).json({ message: "Customer Not Found" });

  res.render("dashboard/customer/customer_edit", {
    layout: "layouts/layout_main",
    title: "Customers | We Transport",
    date: moment(new Date()).format("DD-MM-YYYY"),
    customer: customer,
  });
});

const updateCustomer = asyncHandler(async (req, res) => {
  const { customer_id } = req.params;
  let customer = await CustomerModel.findById(customer_id);
  if (!customer) return res.status(StatusCodes.NOT_FOUND).json({ message: "Customer Not Found" });

  let updated_customer;
  try {
    updated_customer = await CustomerModel.findByIdAndUpdate(customer_id, req.body, { new: true, runValidators: true });
  } catch (err) {
    return res.status(StatusCodes.OK).json({ message: "Customer update failed!", err });
  }
  res.status(StatusCodes.OK).json({ message: "Customer updated Successfully!", updated_customer });
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const { customer_id } = req.params;
  const customer = await CustomerModel.findById(customer_id);

  if (!customer) return res.status(StatusCodes.NOT_FOUND).json({ message: "Customer Not Found" });

  customer.remove();

  res.status(StatusCodes.OK).json({ message: "Customer removed successfully!" });
});

module.exports = {
  loadCustomerList,
  loadCustomerAdd,
  loadCustomerEdit,
  addCustomer,
  deleteCustomer,
  updateCustomer,
};
