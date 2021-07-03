const { errorHandler } = require('./error.middleware');
const { asyncHandler } = require('./asyncHandler.middleware');

module.exports = {
  errorHandler,
  asyncHandler,
};
