const { query } = require('express-validator');

const listClientsValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('Invalid page number'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Invalid limit number'),
  query('name').optional(),
  query('sortBy').optional().isString(),
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Invalid sortOrder'),
];


module.exports = {
  listClientsValidator,
};
