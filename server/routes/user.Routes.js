const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { changeStatusValidator,updateProfileValidator,changePasswordValidator,updateStaffProfileValidator} = require('../validators/userValidator');
const { verifyToken, checkUserType } = require('../middleware/authMiddleware');


router.patch('/api/user/block-status/:id', verifyToken, checkUserType(['admin']), changeStatusValidator, usersController.changeUserStatus );
router.patch('/api/user/password', verifyToken, checkUserType(['admin','user']), changePasswordValidator, usersController.updatePassword);
router.get('/api/user/profile', verifyToken, checkUserType(['admin','user','staff']), usersController.getProfileDetails);
router.patch('/api/user/profile-update', verifyToken, checkUserType(['admin','user']), updateProfileValidator,usersController.updateProfile);
router.patch('/api/user/satff-profile-update', verifyToken, checkUserType(['staff']), updateStaffProfileValidator,usersController.updateStaffProfile);

module.exports = router;