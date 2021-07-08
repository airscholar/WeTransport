const express = require("express");
const router = express.Router();

const { shipmentController, courierController, driverController, customerController } = require("../controllers/index");

const verifyToken = require("../middlewares/verifier.middleware");

//customer
router.route("/customerList").get((req, res) => {
  res.redirect("/customerList/true");
});
router.route("/shipmentAdd").get((req, res) => {
  res.redirect("/customerList/false");
});
router.route("/customerList/:shipment_status").get(verifyToken, customerController.loadCustomerList);
router.route("/customerAdd").get(verifyToken, customerController.loadCustomerAdd).post(verifyToken, customerController.addCustomer);
router.route("/customerEdit").get(verifyToken, customerController.loadCustomerEdit);
router.route("/customerEdit/:customer_id").get(verifyToken, customerController.loadCustomerEdit).put(verifyToken, customerController.updateCustomer);
router.route("/customerDelete/:customer_id").delete(verifyToken, customerController.deleteCustomer);

//courier
router.route("/courierList").get(verifyToken, courierController.loadCourierList);
router.route("/courierAdd").get(verifyToken, courierController.loadCourierAdd);

//shipment
router.route("/shipmentList").get(verifyToken, shipmentController.loadShipmentList);
router.route("/shipmentAdd/:customer_id").get(verifyToken, shipmentController.loadShipmentAdd).post(shipmentController.addShipment);
router.route("/shipmentEdit/:shipment_id").get(verifyToken, shipmentController.loadShipmentEdit).put(verifyToken, shipmentController.updateShipment);
router.route("/shipmentDelete/:shipment_id").delete(shipmentController.deleteShipment);
router.route("/shipmentCheck").post(shipmentController.checkShipment);

//driver
router.route("/driverList").get(verifyToken, driverController.loadDriverList);
router.route("/driverAdd").get(verifyToken, driverController.loadDriverAdd).post(verifyToken, driverController.addDriver);
router.route("/driverEdit").get(verifyToken, driverController.loadDriverEdit).put(verifyToken, driverController.driverUpdate);
router.route("/driverEdit/:driver_id").get(verifyToken, driverController.loadDriverEdit).put(verifyToken, driverController.driverUpdate);
router.route("/driverDelete/:driver_id").delete(verifyToken, driverController.deleteDriver);
router.route("/driverEnroute/:tracking_id").get(driverController.loadDriverEnroute);

module.exports = router;
