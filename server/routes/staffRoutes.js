const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const {listStaffValidator , changePasswordValidator , addStaffValidator ,  changeLocationValidator} = require('../validators/staffValidator');
const { verifyToken, checkUserType } = require('../middleware/authMiddleware');

// List all staff members
router.get('/api/staff', verifyToken, checkUserType(['admin']), listStaffValidator, staffController.getStaffList);

// Create a new staff member
router.post('/api/staff', verifyToken, checkUserType(['admin']), addStaffValidator,staffController.addStaff);

router.patch('/api/staff/password/:id', verifyToken, checkUserType(['admin']), changePasswordValidator, staffController.changePassword);

// Delete an existing staff member by _id
router.delete('/api/staff/:id', verifyToken, checkUserType(['admin']), staffController.deleteStaff);

router.patch('/api/staff/:id/updateLocation', verifyToken, checkUserType(['admin']), changeLocationValidator, staffController.changeLocation);


module.exports = router;