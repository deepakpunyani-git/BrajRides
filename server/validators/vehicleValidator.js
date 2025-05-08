const { body  , query} = require('express-validator');

exports.addVehicleValidator = [
  body('brand').notEmpty().withMessage('Brand is required'),
  body('model').notEmpty().withMessage('Model is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('type').isIn(['scooty', 'bike']).withMessage('Type must be either scooty or bike'),
  body('location').notEmpty().withMessage('Location is required')
];

exports.updateVehicleValidator = [
  body('brand').notEmpty().withMessage('Brand is required'),
  body('model').notEmpty().withMessage('Model is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('type').isIn(['scooty', 'bike']).withMessage('Type must be either scooty or bike'),
  body('location').notEmpty().withMessage('Location is required')
];


exports.validateVehicleFilters = [
  query('brand').optional().isString().withMessage('Brand must be a string'),
  query('location').optional().isMongoId().withMessage('Location must be a valid ID'),
  query('type').optional().isIn(['scooty', 'bike']).withMessage('Invalid vehicle type'),
];

exports.validateVehicleSearch = [
  body('location')
    .notEmpty()
    .withMessage('Location is required')
    .isString()
    .withMessage('Location must be a string'),

  body('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .toDate()
    .withMessage('Start date must be a valid date'),

  body('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .toDate()
    .withMessage('End date must be a valid date'),

  body('type')
    .optional()
    .isIn(['bike', 'scooty'])
    .withMessage('Type must be either "bike" or "scooty"'),

  body('isElectric')
    .optional()
    .isBoolean()
    .withMessage('isElectric must be a boolean'),

];
