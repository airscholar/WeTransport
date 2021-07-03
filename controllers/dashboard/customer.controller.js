const moment = require("moment");

const loadCustomerList = (req, res) => {
  res.render("dashboard/customer_list", {
    layout: "layouts/layout_main",
    title: "Customers | We Transport",
    date: moment(new Date()).format("DD-MM-YYYY"),
  });
};

const loadCustomerAdd = (req, res) => {
  res.render("dashboard/customer_add", {
    layout: "layouts/layout_main",
    title: "Customers | We Transport",
    date: moment(new Date()).format("DD-MM-YYYY"),
  });
};

module.exports = {
  loadCustomerList,
  loadCustomerAdd,
};
