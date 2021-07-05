const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const { shipmentController } = require("../controllers/index");

const { customerController } = require("../controllers/index");

//customer
router.route("/customerList").get(customerController.loadCustomerList);
router.route("/customerAdd").get(customerController.loadCustomerAdd).post(customerController.addCustomer);
router.route("/customerEdit").get(customerController.loadCustomerEdit);
router.route("/customerEdit/:customer_id").get(customerController.loadCustomerEdit).put(customerController.updateCustomer);
router.route("/customerDelete/:customer_id").delete(shipmentController.deleteDriver);

//courier
router.route("/courierList").get(shipmentController.loadCourierList);
router.route("/courierAdd").get(shipmentController.loadCourierAdd);

//shipment
router.route("/shipmentList").get(shipmentController.loadShipmentList);
router.route("/shipmentAdd").get(shipmentController.loadShipmentAdd);

//driver
router.route("/driverList").get(shipmentController.loadDriverList);
router.route("/driverAdd").get(shipmentController.loadDriverAdd).post(shipmentController.addDriver);
router.route("/driverEdit").get(shipmentController.loadDriverEdit).put(shipmentController.driverUpdate);
router.route("/driverEdit/:driver_id").get(shipmentController.loadDriverEdit).put(shipmentController.driverUpdate);
router.route("/driverDelete/:driver_id").delete(shipmentController.deleteDriver);

module.exports = router;
