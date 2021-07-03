const { asyncHandler } = require('../../middlewares/asyncHandler.middleware');

const getTracking = asyncHandler(async function (req, res) {
  res.render('tracking', { layout: 'layouts/layout_login.hbs', header_type: 'login' });
});

module.exports = {
  getTracking,
};
