const moment = require("moment");

const loadShipmentList = (req, res) => {
  res.render("dashboard/shipment_list", {
    layout: "layouts/layout_main",
    title: "Shipments | We Transport",
    date: moment(new Date()).format("DD-MM-YYYY"),
  });
};
const loadShipmentAdd = (req, res) => {
  res.render("dashboard/shipment_add", {
    layout: "layouts/layout_main",
    title: "Shipments | We Transport",
    date: moment(new Date()).format("DD-MM-YYYY"),
  });
};
const loadCourierList = (req, res) => {
  res.render("dashboard/courier_list", {
    layout: "layouts/layout_main",
    title: "Shipments | We Transport",
    date: moment(new Date()).format("DD-MM-YYYY"),
  });
};
const loadCourierAdd = (req, res) => {
  res.render("dashboard/courier_add", {
    layout: "layouts/layout_main",
    title: "Shipments | We Transport",
    date: moment(new Date()).format("DD-MM-YYYY"),
  });
};
const loadDriverList = (req, res) => {
  res.render("dashboard/driver_list", {
    layout: "layouts/layout_main",
    title: "Shipments | We Transport",
    date: moment(new Date()).format("DD-MM-YYYY"),
  });
};
const loadDriverAdd = (req, res) => {
  res.render("dashboard/driver_add", {
    layout: "layouts/layout_main",
    title: "Shipments | We Transport",
    date: moment(new Date()).format("DD-MM-YYYY"),
  });
};

module.exports = {
  loadShipmentList,
  loadShipmentAdd,
  loadCourierList,
  loadCourierAdd,
  loadDriverList,
  loadDriverAdd,
};
