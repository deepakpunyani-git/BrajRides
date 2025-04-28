const { body } = require('express-validator');

// Validator for email login
// const emailLoginValidator = [
//   body('email').isEmail().withMessage('Please enter a valid email'),
// ];

// const verifyOtpValidator = [
//   body('email').isEmail().withMessage('Please enter a valid email'),
//   body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP should be 6 digits'),
// ];


const phoneLoginValidator = [
  body('phone')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please enter a valid 10-digit phone number starting with 6-9'),
];

const verifyPhoneOtpValidator = [
  body('phone')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please enter a valid 10-digit phone number starting with 6-9'),
  body('otp')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP should be 6 digits'),
];

const adminStaffLoginValidator = [
  body('usernameOrEmail').notEmpty().withMessage('Username or email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

module.exports = {
  phoneLoginValidator,
  verifyPhoneOtpValidator,
  adminStaffLoginValidator,
};
