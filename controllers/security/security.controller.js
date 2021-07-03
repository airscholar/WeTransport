// const User = require('../../database/models/User.model');
// const { StatusCodes } = require('http-status-codes');
// const winston = require('winston');
// const jwt = require('jsonwebtoken');
// const config = require('../../config');
// const cryptoGen = require('../../authentication/cryptoGen');
// const moment = require('moment');
// const emailService = require('../../services/emailserviceSendGrid');
const { asyncHandler } = require('../../middlewares/index.middleware');
// const ErrorResponse = require('../../utilities/errorResponse.helper');
// const { validationResult } = require('express-validator');

const loadLogin = asyncHandler(async (req, res) => {
  res.render('index', { layout: 'layouts/layout_login.hbs', header_type: 'login' });
});
// const login = asyncHandler(async (req, res, next) => {
//   const user = req.user;
//   try {
//     req.login(user, { session: false }, async error => {
//       if (error) {
//         winston.error(error);
//         throw new ErrorResponse('Internal Server Error', StatusCodes.INTERNAL_SERVER_ERROR);
//       }
//       req.login(user, { session: false }, async error => {
//         if (error) throw new ErrorResponse('Internal Server Error', StatusCodes.INTERNAL_SERVER_ERROR);

//         let token = await generateUserToken(user);

//         let temp = req.session.passport;
//         req.session.regenerate(async err => {
//           req.session.passport = temp;
//           req.session.save(async err => {
//             const res_user = await User.findById(user._id).select('-password');
//             return res.status(StatusCodes.OK).json({ message: 'User logged in successfully', result: res_user, token });
//           });
//         });
//       });
//     });
//   } catch (error) {
//     winston.error(error);
//     throw new ErrorResponse('Internal Server Error', StatusCodes.INTERNAL_SERVER_ERROR);
//   }
// });

// const generateUserToken = user => {
//   const body = { _id: user._id, email: user.email };
//   const accessTokenLife = config.jwtTokenExpiry() * 1000; // 7 days in seconds
//   const token = jwt.sign({ user: body }, config.jwtTokenSecret(), { expiresIn: accessTokenLife });
//   return token;
// };

// const loggedInUser = asyncHandler(async (req, res, next) => {
//   const user = await User.findById(req.user.id);

//   res.status(StatusCodes.OK).json({
//     message: 'User logged in',
//     result: user,
//   });
// });

const loadRegistration = asyncHandler(async (req, res) => {
  res.render('register', { layout: 'layouts/layout_login.hbs' });
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

    res.status(StatusCodes.CREATED).json({ message: 'User registered successfully', result: user, token });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'User registration failed' });
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
  // login,
  // registration,
  // logout,
  // passwordReset,
  // loggedInUser,
  // resetUserPassword,
};
