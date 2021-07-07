const config = require("../../config");
const moment = require("moment");

const loadDashboard = (req, res) => {
  res.render("dashboard/main", {
    layout: "layouts/layout_main",
    title: "Dashboard | We Transport",
    date: moment().format("LLLL"),
    user: req.user,
  });
};

module.exports = {
  loadDashboard,
};
