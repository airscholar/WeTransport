const ErrorResponse = require('../utilities/errorResponse.helper');

const errorHandler = (err, req, res, next) => {
  console.log(err);
  let error = { ...err };
  error.message = err.message;

  //bad object id
  if (err.name === 'CastError') {
    const msg = `Resource not found`;

    error = new ErrorResponse(msg, 404);
  }

  //duplicate key
  if (err.code === 11000) {
    const msg = `Duplicate field value entered - ${JSON.stringify(err.keyValue)}`;

    error = new ErrorResponse(msg, 400);
  }

  //validation errors
  if (err.name === 'ValidationError') {
    const msg = Object.values(err.errors).map(val => val.message);

    error = new ErrorResponse(msg, 400);
  }

  //more errors

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server error',
  });
};

module.exports = { errorHandler };
