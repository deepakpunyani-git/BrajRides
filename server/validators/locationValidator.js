const { body } = require('express-validator');

const locationValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .isMobilePhone().withMessage('Invalid phone number'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  body('mapLink').optional().isURL().withMessage('Invalid URL format for mapLink'),
];

module.exports = locationValidator;
