const express = require('express');
const { validatePayment } = require('../validators/paymentValidator'); 
const { processPayment , actionCancelRequest } = require('../controllers/paymentController');
const { verifyToken , checkUserType } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest'); 
const router = express.Router();

router.post('/payment',verifyToken,validatePayment, validateRequest, processPayment);
router.post('/confirm-cancel-request',  verifyToken, checkUserType(['admin','staff']), actionCancelRequest);

module.exports = router;
