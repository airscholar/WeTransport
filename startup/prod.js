const helmet = require('helmet');
const compression = require('compression');

module.exports = function (app) {
  // Use defaults from Helmet, and customize CSP
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  app.use(compression());
};
