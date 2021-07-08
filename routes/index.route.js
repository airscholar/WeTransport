const express = require("express");

const router = express.Router();

const { securityController, trackingController } = require("../controllers/index");
const { protectRoute, authorize } = require("../middlewares/auth.middleware");
const verifyToken = require("../middlewares/verifier.middleware");

/* GET login home page. */
router.route("/").get(verifyToken, securityController.loadLogin).post(securityController.login);

/* GET registration page. */
router.route("/register").get(securityController.loadRegistration);

/* GET tracking page. */
router.route("/tracking").get(trackingController.getTracking);
router.route("/tracker/:tracking_id").get(verifyToken, trackingController.getTracker);
router.route("/test").get((req, res) => {
  res.json({
    message: "testing",
  });
});

module.exports = router;
