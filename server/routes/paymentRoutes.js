const express = require('express');
const { validatePayment } = require('../validators/paymentValidator'); 
const { processPayment } = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest'); 
const router = express.Router();

router.post('/payment',verifyToken,validatePayment, validateRequest, processPayment);

module.exports = router;
