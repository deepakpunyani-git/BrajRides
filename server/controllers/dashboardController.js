const moment = require('moment');
const User = require('../models/User');
const Location = require('../models/Location'); 
const Booking = require('../models/Booking');

exports.getDashboard = async (req, res) => {
  try {
    const user = req.user;
    const isAdmin = user.userType === 'admin';

    const today = moment().startOf('day').toDate();
    const tomorrow = moment().add(1, 'day').startOf('day').toDate();
    const tomorrowEnd = moment(tomorrow).endOf('day').toDate();
    const weekStart = moment().startOf('week').toDate();
    const weekEnd = moment().endOf('week').toDate();
    const monthStart = moment().startOf('month').toDate();
    const monthEnd = moment().endOf('month').toDate();

    const locationFilter = isAdmin ? {} : { location: user.location };

    const [
      totalBookingsToday,
      totalCancellationsToday,
      totalConfirmedToday,
      totalBookingsThisWeek,
      totalBookingsThisMonth,
      bookingsTomorrow,
      bookingsByVehicle
    ] = await Promise.all([
      Booking.countDocuments({ ...locationFilter, createdAt: { $gte: today } }),
      Booking.countDocuments({ ...locationFilter, status: 'cancelled', createdAt: { $gte: today } }),
      Booking.countDocuments({ ...locationFilter, status: 'confirmed', createdAt: { $gte: today } }),
      Booking.countDocuments({ ...locationFilter, createdAt: { $gte: weekStart, $lte: weekEnd } }),
      Booking.countDocuments({ ...locationFilter, createdAt: { $gte: monthStart, $lte: monthEnd } }),
      Booking.find({ ...locationFilter, dateFrom: { $gte: tomorrow, $lte: tomorrowEnd } })
        .populate('user', 'name email')
        .populate('vehicle', 'name'),
      Booking.aggregate([
        { $match: { ...locationFilter } },
        {
          $group: {
            _id: '$vehicle',
            count: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: 'ridesvehicles',
            localField: '_id',
            foreignField: '_id',
            as: 'vehicle'
          }
        },
        { $unwind: '$vehicle' },
        {
          $project: {
            name: '$vehicle.name',
            count: 1
          }
        }
      ])
    ]);

    res.json({
      isAdmin,
      totalBookingsToday,
      totalCancellationsToday,
      totalConfirmedToday,
      totalBookingsThisWeek,
      totalBookingsThisMonth,
      bookingsTomorrow,
      bookingsByVehicle
    });
  } catch (err) {
    console.error('Dashboard Error:', err);
    res.status(500).json({ message: 'Failed to load dashboard', error: err });
  }
};
