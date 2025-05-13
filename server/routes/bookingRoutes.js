const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyToken, checkUserType } = require('../middleware/authMiddleware');

router.get('/list', verifyToken, checkUserType(['admin','staff']), bookingController.getAllBookings);
router.put('/:bookingId/cancel-request', verifyToken, checkUserType(['user']), bookingController.requestCancel);
router.get('/my-bookings', verifyToken, checkUserType(['user']), bookingController.getMyBookings); 
router.post('/complete-booking',  verifyToken, checkUserType(['admin','staff']), bookingController.completeBooking);

module.exports = router;
