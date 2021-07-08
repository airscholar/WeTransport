const User = require("../../database/models/customer.model");
const { StatusCodes } = require("http-status-codes");
// const winston = require('winston');
const jwt = require("jsonwebtoken");
const config = require("../../config");
// const cryptoGen = require("../../authentication/cryptoGen");
const moment = require("moment");
// const emailService = require('../../services/emailserviceSendGrid');
const { asyncHandler } = require("../../middlewares/index.middleware");
const ErrorResponse = require("../../utilities/errorResponse.helper");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const customerModel = require("../../database/models/customer.model");

const loadLogin = asyncHandler(async (req, res) => {
  let token = req.cookies.token;
  if (token || req.user) return res.redirect("/dashboard");
  else res.render("index", { layout: "layouts/layout_login.hbs", header_type: "login" });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  //   check if password matches
  const isMatch = await user.matchEnteredPassword(password);

  // when not matched
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = async (user, statusCode, res) => {
  // Create signed JwtToken on the method
  //   Note the diff between statics and method
  // statics will be User.staticMethod()
  // method will be createdUser.method()
  const token = await user.getSignedJwtToken();

  const options = {
    //30 days to milliseconds
    expires: new Date(Date.now() + process.env.JWT_TOKEN_EXPIRY * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  //add secure to options to determine running capacity
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

const loadRegistration = asyncHandler(async (req, res) => {
  res.render("register", { layout: "layouts/layout_login.hbs" });
});

const registration = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  try {
    const user = await User.create(req.body);

    let token = generateUserToken(user);

    // If we have gotten this far, return success
    // emailService.emailRegistrationNotification(user, req.ip);

    res.header("auth-token", token).status(StatusCodes.CREATED).json({ message: "User registered successfully", result: user, token });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "User registration failed" });
  }
});

const generateUserToken = user => {
  const body = { _id: user._id, email: user.email };
  const accessTokenLife = config.jwtTokenExpiry() * 1000; // 7 days in seconds
  const token = jwt.sign({ user: body }, config.jwtTokenSecret(), { expiresIn: accessTokenLife });
  return token;
};

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = {
  loadLogin,
  loadRegistration,
  login,
  registration,
  logout,
  // passwordReset,
  // loggedInUser,
  // resetUserPassword,
};
