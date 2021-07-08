const config = require("../../config");
const moment = require("moment");
const shipmentModel = require("../../database/models/shipment.model");

const loadDashboard = async (req, res) => {
  const shipmentLists = await shipmentModel.find();
  res.render("dashboard/shipment/shipment_list", {
    layout: "layouts/layout_main",
    title: "Dashboard | We Transport",
    date: moment().format("LLLL"),
    user: req.user,
    dashboard: true,
    shipmentLists,
  });
};

module.exports = {
  loadDashboard,
};
