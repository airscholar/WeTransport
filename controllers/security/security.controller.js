const User = require("../../database/models/customer.model");
const { StatusCodes } = require("http-status-codes");
// const winston = require('winston');
// const jwt = require('jsonwebtoken');
// const config = require('../../config');
// const cryptoGen = require('../../authentication/cryptoGen');
const moment = require("moment");
// const emailService = require('../../services/emailserviceSendGrid');
const { asyncHandler } = require("../../middlewares/index.middleware");
const ErrorResponse = require("../../utilities/errorResponse.helper");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const loadLogin = asyncHandler(async (req, res) => {
  if (req.user) {
    return res.redirect("/dashboard");
  }
  res.render("index", { layout: "layouts/layout_login.hbs", header_type: "login" });
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
    emailService.emailRegistrationNotification(user, req.ip);

    res.header("auth-token", token).status(StatusCodes.CREATED).json({ message: "User registered successfully", result: user, token });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "User registration failed" });
  }
});

// const logout = asyncHandler(async (req, res) => {
//   // Since there is no really logic in this and passport is doing most of the job, putting the response logic in controller.
//   req.logout();
//   if (req.session) {
//     req.session.destroy(err => {
//       if (err) {
//         winston.error(err);
//         throw new ErrorResponse('Internal Server Error', StatusCodes.INTERNAL_SERVER_ERROR);
//       }
//       return res.status(StatusCodes.OK).send('logged out successfully');
//     });
//   } else {
//     if (req.isUnauthenticated()) {
//       return res.status(StatusCodes.OK).send('logged out successfully');
//     } else {
//       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('server error - could not log out');
//     }
//   }
// });

// const passwordReset = asyncHandler(async (req, res) => {
//   try {
//     let user = await User.findOne({ email: req.body.email }).exec();
//     let token = await cryptoGen.generateRandomToken();

//     // If an associated user with the email wasn't found, and a token not generated, stop here
//     if (!(user && token)) {
//       result = { StatusCodes: StatusCodes.NOT_FOUND, status: 'failed', errorDetails: 'User not found' };
//       return res.json(result);
//     }

//     // Generate password reset token and save it
//     user.passwordResetToken = token;
//     user.passwordResetExpires = moment(Date.now())
//       .add(config.passwordResetValidity() / 60000, 'm')
//       .toDate();
//     const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true, runValidators: true });

//     // If the user was not properly saved, stop here and return failure
//     if (!updatedUser) {
//       result = { StatusCodes: StatusCodes.INTERNAL_SERVER_ERROR, status: 'failed', errorDetails: StatusCodes.INTERNAL_SERVER_ERROR };
//       return res.json(result);
//     }

//     // If we have gotten this far, return success
//     console.log('sending password reset email');
//     emailService.emailPasswordResetInstructions(updatedUser, req.ip);
//     console.log('sent password reset email');
//     return res.json({ StatusCodes: StatusCodes.OK, status: 'successful', responseData: true });
//   } catch (err) {
//     console.log('Error in forgotPassword Service', { meta: err });
//     result = { StatusCodes: StatusCodes.BAD_REQUEST, status: 'failed', errorDetails: err };
//     return res.json(result);
//   }
// });

// const resetUserPassword = asyncHandler(async (req, res) => {
//   const { token, email, password } = req.body;

//   if (!token || !email) {
//     return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid password reset token or user' });
//   }

//   console.log(token, email, password);
//   let user = await isPasswordResetTokenValid(token);

//   if (!user) {
//     return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid password reset token or user' });
//   }

//   if (user.email !== email) {
//     return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid password reset token user' });
//   }

//   user.password = password;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;

//   const newUser = await user.save();

//   if (!newUser) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Unable to update user password' });
//   }

//   //user password has been updated
//   //send email to user
//   emailService.emailPasswordResetConfirmation(user, req.ip);

//   res.status(StatusCodes.OK).json({ message: 'User Password reset successful' });
// });

// const isPasswordResetTokenValid = async token => {
//   try {
//     let user = await User.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: Date.now() } }).exec();

//     if (!user) {
//       return;
//     }

//     return user;
//   } catch (err) {
//     winston.error('Error in isPasswordResetTokenValid Service', { meta: err });
//     return;
//   }
// };

module.exports = {
  loadLogin,
  loadRegistration,
  login,
  // registration,
  // logout,
  // passwordReset,
  // loggedInUser,
  // resetUserPassword,
};
