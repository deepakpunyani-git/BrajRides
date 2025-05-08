const { body, validationResult } = require('express-validator');

exports.validateMessage = [
  body('bookingId').notEmpty().withMessage('Booking ID is required'),
  body('message').trim().notEmpty().withMessage('Message cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];