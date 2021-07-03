const express = require("express");

const router = express.Router();

const { shipmentController } = require("../controllers/index");

const { customerController } = require("../controllers/index");

/* GET login home page. */
router.route("/customerList").get(customerController.loadCustomerList);
router.route("/customerAdd").get(customerController.loadCustomerAdd);
router.route("/courierList").get(shipmentController.loadCourierList);
router.route("/courierAdd").get(shipmentController.loadCourierAdd);
router.route("/shipmentList").get(shipmentController.loadShipmentList);
router.route("/shipmentAdd").get(shipmentController.loadShipmentAdd);
router.route("/driverList").get(shipmentController.loadDriverList);
router.route("/driverAdd").get(shipmentController.loadDriverAdd);

module.exports = router;
