const express = require("express");

const router = express.Router();

const { dashboardController } = require("../controllers/index");
const verifyToken = require("../middlewares/verifier.middleware");

/* GET login home page. */
router.route("/").get(verifyToken, dashboardController.loadDashboard);

module.exports = router;
