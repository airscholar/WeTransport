const jwt = require("jsonwebtoken");
const errorResponse = require("./error.middleware");
const { asyncHandler } = require("./asyncHandler.middleware");
const User = require("../database/models/customer.model");
const ErrorResponse = require("../utilities/errorResponse.helper");

// protect route
const protectRoute = async (req, res, next) => {
  let token;
  //extract token from headers sent with the request
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    //split bearer from token
    token = req.headers.authorization.split(" ")[1];
  }
  // check token in cookies
  else if (req.headers.cookie.split("=")[1]) {
    token = req.headers.cookie.split("=")[1];
  }

  if (!token) {
    res.redirect("/");
    // return next(new ErrorResponse("Access to this section is not authorized!", 401));
  }

  try {
    //  verify token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.redirect("/");
    // return next(new ErrorResponse("Access to this section is not authorized!", 401));
  }
};

// @desc      Authorize user based on role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.redirect("/");
    }

    next();
  };
};

module.exports = { protectRoute, authorize };
