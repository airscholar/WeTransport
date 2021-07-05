const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const { shipmentController } = require("../controllers/index");

const { customerController } = require("../controllers/index");

router.route("/customerList").get(customerController.loadCustomerList);
router.route("/customerAdd").get(customerController.loadCustomerAdd);
router.route("/courierList").get(shipmentController.loadCourierList);
router.route("/courierAdd").get(shipmentController.loadCourierAdd);
router.route("/shipmentList").get(shipmentController.loadShipmentList);
router.route("/shipmentAdd").get(shipmentController.loadShipmentAdd);
router.route("/driverList").get(shipmentController.loadDriverList);
router
  .route("/driverEdit")
  .get(shipmentController.loadDriverEdit)
  .post(
    [
      check("first_name", "First name is required").isAlpha(),
      check("last_name", "Last name is required"),
      check("email", "Email is required"),
      check("telephone", "Telephone is required"),
      check("phone_number", "Phone Number is required"),
      check("vehicle_reg_no", "Vehicle Registration Number is required"),
      check("vehicle_code", "Vehicle Code is required"),
      check("gender", "Gender is required"),
      check("address", "Address is required"),
      check("city", "City is required"),
      check("country", "Country is required"),
      check("postal_code", "Postal Code is required"),
      check("user_status", "User Status is required"),
    ],
    shipmentController.driverUpdate
  );

router
  .route("/driverEdit/:driver_id")
  .get(shipmentController.loadDriverEdit)
  .post(
    [
      check("first_name", "First name is required").isAlpha(),
      check("last_name", "Last name is required"),
      check("email", "Email is required"),
      check("telephone", "Telephone is required"),
      check("phone_number", "Phone Number is required"),
      check("vehicle_reg_no", "Vehicle Registration Number is required"),
      check("vehicle_code", "Vehicle Code is required"),
      check("gender", "Gender is required"),
      check("address", "Address is required"),
      check("city", "City is required"),
      check("country", "Country is required"),
      check("postal_code", "Postal Code is required"),
      check("user_status", "User Status is required"),
    ],
    shipmentController.driverUpdate
  );

router.route("/driverDelete/:driver_id").delete(shipmentController.deleteDriver);

router
  .route("/driverAdd")
  .get(shipmentController.loadDriverAdd)
  .post(
    [
      check("first_name", "First name is required").isAlpha(),
      check("last_name", "Last name is required"),
      check("email", "Email is required"),
      check("telephone", "Telephone is required"),
      check("phone_number", "Phone Number is required"),
      check("vehicle_reg_no", "Vehicle Registration Number is required"),
      check("vehicle_code", "Vehicle Code is required"),
      check("gender", "Gender is required"),
      check("address", "Address is required"),
      check("city", "City is required"),
      check("country", "Country is required"),
      check("postal_code", "Postal Code is required"),
      check("user_status", "User Status is required"),
    ],
    shipmentController.addDriver
  );

router.route("/retriveDrivers").get(shipmentController.retrieveDrivers);

module.exports = router;
