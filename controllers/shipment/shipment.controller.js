const moment = require("moment");
const loadShipment = (req, res) => {
  res.render("dashboard/shipment_list", {
    layout: "layouts/layout_main",
    title: "Shipments | We Transport",
    date: moment(new Date()).format("DD-MM-YYYY"),
  });
};

module.exports = {
  loadShipment,
};
