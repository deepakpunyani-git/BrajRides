const { body , query , param } = require('express-validator');

const addStaffValidator = [
  body('name', 'Name is required').notEmpty(),
  body('username', 'Username is required').notEmpty(),
  body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
  body('location').isMongoId().withMessage('Invalid location ID')
];

const changePasswordValidator = [
  body('newPassword', 'Password must be at least 8 characters long').isLength({ min: 8 }),
];


const listStaffValidator = [
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Invalid sortOrder parameter'),
];

const changeLocationValidator = [
  param('id').isMongoId().withMessage('Invalid staff ID'),
  body('location').isMongoId().withMessage('Invalid location ID'),
];

module.exports = {
  addStaffValidator,
  changePasswordValidator,
  listStaffValidator,
  changeLocationValidator
};
