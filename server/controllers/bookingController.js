const Booking = require('../models/Booking');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');  




exports.getAllBookings = async (req, res) => {
  try {
    const user = req.user;
    const { page = 1, limit = 10, status, name, fromDate, toDate , phone , location , customerName } = req.query;

    const query = {};

    if (phone) {
      const users = await User.find({ phone: { $regex: phone, $options: 'i' } }, '_id');
      const userIds = users.map(u => u._id);
      filter.user = { $in: userIds };
    }

    // Staff
    if (user.userType === 'staff') {
      const staff = await User.findById(user._id);
      if (!staff?.location) return res.status(403).send('Location not assigned.');
      const vehiclesAtLocation = await Vehicle.find({ location: staff.location }).select('_id');
      query.vehicle = { $in: vehiclesAtLocation.map(v => v._id) };
    }else{

      if(location){
        const vehiclesAtLocation = await Vehicle.find({ location: location}).select('_id');
        query.vehicle = { $in: vehiclesAtLocation.map(v => v._id) };
      }


    }

    if (status) query.status = status;
    if (customerName) query.customerName = { $regex: customerName, $options: 'i' };
    if (fromDate && toDate) {
      query.createdAt = { $gte: new Date(fromDate), $lte: new Date(toDate) };
    }

    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
    .populate({
      path: 'vehicle',
      select: 'brand model location',
      populate: {
        path: 'location',
        select: 'name address',
      },
    })
      .populate('user', 'name phone')
      .populate('cancelRequestActionBy', 'name phone')

      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

      res.status(200).json({
      bookings,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      userType: user.userType,
      filters: { status, name, fromDate, toDate }
    });
  } catch (error) {
    console.error('Error loading bookings:', error);
    res.status(500).send('Server Error');
  }
};



exports.requestCancel = async (req, res) => {
  const { reason } = req.body;
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });


    const now = new Date();
    const diffHours = (new Date(booking.dateFrom) - now) / (1000 * 60 * 60);
    if (diffHours < 24) {
      return res.status(400).json({ message: 'Cannot request cancellation within 24 hours of start date' });
    }

    booking.cancelRequest = true;
    booking.cancelReason = reason;
    booking.cancelRequestedAt = new Date();
    booking.cancelRequestStatus = 'pending';
    booking.cancelRequestActionBy = undefined;
    booking.cancelRequestActionAt = undefined;

    await booking.save();
    res.status(200).json({ message: 'Cancel request submitted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.getMyBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      status,
      location, 
      page = 1,
      limit = 2,
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    const query = { user: userId };

    if (status) {
      query.status = status;
    }

    if (location) {
      const vehiclesAtLocation = await Vehicle.find({ location }).select('_id');
      const vehicleIds = vehiclesAtLocation.map(v => v._id);
      query.vehicle = { $in: vehicleIds };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOrder = order === 'desc' ? -1 : 1;

    const total = await Booking.countDocuments(query);

    const bookings = await Booking.find(query)
      .populate({
        path: 'vehicle',
        select: 'brand model location',
        populate: {
          path: 'location',
          select: 'name address',
        },
      })
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      bookings,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('Error in getMyBookings:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


exports.completeBooking = async (req, res) => {
  const { bookingId } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status !== 'confirmed') {
      return res.status(400).json({ message: 'Booking is not in confirmed status' });
    }

    booking.status = 'completed';
    await booking.save();

    res.json({ message: 'Booking marked as completed' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};