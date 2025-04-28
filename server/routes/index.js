const express = require('express');
const router = express.Router();

const locationRoutes = require('./locationRoutes');
const authRoutes = require('./authRoutes');
const webPages = require('./webPages.Routes');
const dashboardRoutes = require('./dashboardRoutes');
const clientRoutes = require('./clientRoutes');
const userRoutes = require('./user.Routes');
const vehicleRoutes = require('./vehicleRoutes');
const staffRoutes = require('./staffRoutes');
const paymentRoutes = require('./paymentRoutes');

router.use(clientRoutes);
router.use(userRoutes);
router.use(staffRoutes);

router.use('/api/locations',locationRoutes);
router.use('/api/auth',authRoutes);
router.use('/api/vehicles',vehicleRoutes);
router.use('/api/booking', paymentRoutes);

router.use(webPages);
router.use(dashboardRoutes);

module.exports = router;
