const { check, validationResult } = require('express-validator');

exports.validatePayment = [
  check('amount').isNumeric().withMessage('Amount must be a number'),
  check('cardNumber').isLength({ min: 16, max: 16 }).withMessage('Card number must be 16 digits'),
  check('cvv').isLength({ min: 3, max: 4 }).withMessage('CVV must be 3 or 4 digits'),
  check('expMonth').isNumeric().withMessage('Expiry month must be numeric'),
  check('expYear').isNumeric().withMessage('Expiry year must be numeric'),
  check('name').notEmpty().withMessage('Name is required'),

  check('dateFrom').custom((value) => {
    if (isNaN(Date.parse(value))) {
      throw new Error('Start date must be a valid date');
    }
    return true;
  }),
  check('dateTo').custom((value) => {
    if (isNaN(Date.parse(value))) {
      throw new Error('End date must be a valid date');
    }
    return true;
  }),
];
