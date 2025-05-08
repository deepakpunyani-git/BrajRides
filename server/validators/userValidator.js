const { body } = require('express-validator');


const changeStatusValidator = [
  body('block_user')
  .notEmpty().withMessage('Status is required')
  .isBoolean().withMessage('Invalid status')

];

const updateProfileValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('gender').notEmpty().withMessage('Gender is required').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
  body('email').notEmpty().withMessage('email is required').isEmail().withMessage('Invalid email format')

];
const updateStaffProfileValidator = [

  body('name').notEmpty().withMessage('Name is required'),
  body('gender').notEmpty().withMessage('Gender is required').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),

];

const changePasswordValidator = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];


module.exports = {
  changeStatusValidator,
  updateProfileValidator,
  changePasswordValidator,
  updateStaffProfileValidator
};
