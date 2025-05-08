const Ride = require('../models/Vehicle');  
const Booking = require('../models/Booking');
const User = require('../models/User'); 

const fs = require('fs');
const path = require('path');

// Add a new ride
exports.addVehicle = async (req, res) => {
  try {
    const { brand, model, price, type, location, isElectric } = req.body;
    const image = req.file ? req.file.filename : null; 
    const newVehicle = new Ride({
      brand,
      model,
      price,
      type,
      location,
      isElectric: isElectric === 'on' || isElectric === 'true',
      image
    });

    await newVehicle.save();

    res.status(201).json({ message: 'Vehicle added successfully' });
  } catch (error) {
    console.error('Error adding vehicle:', error);
    res.status(500).json({ message: 'Failed to add vehicle' });
  }
};

exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Ride.findById(req.params.id).populate('location');
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({ message: 'Failed to fetch vehicle' });
  }
};





exports.deleteVehicle  = async (req, res) => {
  try {
    const rideId = req.params.id;
    const deletedRide = await Ride.findByIdAndDelete(rideId);

    if (!deletedRide) {
      return res.status(404).json({ message: 'Vehicles not found' });
    }

    res.status(200).json({ message: 'Ride deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete ride.' });
  }
};


exports.search = async (req, res) => {
  try {
    const { location, startDate, endDate, type, isElectric } = req.body;

    if (!location || !startDate || !endDate) {
      return res.status(400).json({ message: 'Location, start date, and end date are required.' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const overlappingBookings = await Booking.find({
      status: "confirmed",
      $or: [
        {
          dateFrom: { $lte: end },
          dateTo: { $gte: start }
        }
      ]
    }).select("vehicle");
    

    const bookedVehicleIds = overlappingBookings.map(booking => booking.vehicle.toString());

    const filter = {
      location,
      _id: { $nin: bookedVehicleIds }, 
    };
    if (type) filter.type = type;
    if (typeof isElectric === 'boolean') filter.isElectric = isElectric;

    const availableVehicles = await Ride.find(filter).populate('location', 'name');

    res.json(availableVehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.getPopularVehicles = async (req, res) => {
  try {
    const popularVehicles = await Ride.aggregate([
      {
        $group: {
          _id: { brand: "$brand", model: "$model" },
          popularity: { $max: "$popularity" },
          vehicle: { $first: "$$ROOT" }
        }
      },
      { $sort: { popularity: -1 } },
      { $limit: 12 },
      {
        $project: {
          brand: "$_id.brand",
          model: "$_id.model",
          popularity: 1
        }
      }
    ]);

    res.json(popularVehicles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch popular vehicles" });
  }
};


exports.updateVehicle = async (req, res) => {
  const { id } = req.params;  
  const { brand, model, location, price, type, isElectric } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const vehicle = await Ride.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    

    vehicle.brand = brand || vehicle.brand;
    vehicle.model = model || vehicle.model;
    vehicle.location = location || vehicle.location;
    vehicle.price = price || vehicle.price;
    vehicle.type = type || vehicle.type;
    vehicle.isElectric = isElectric === 'on' || isElectric === 'true';

    if (image) {
      if (vehicle.image) {
        fs.unlink(path.join(__dirname, '..', 'uploads', vehicle.image), (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }
      vehicle.image = image;
    }

    await vehicle.save();
    res.status(200).json({ message: 'Vehicle updated successfully', vehicle });
  } catch (err) {
    console.error('Error updating vehicle:', err);
    res.status(500).json({ message: 'Failed to update vehicle' });
  }
};


exports.getVehiclesForStaff = async (req, res) => {
  const { brand, type, page = 1, limit = 20 } = req.query;

  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('location');

    if (!user || !user.location) {
      return res.status(400).json({ success: false, message: 'User location not found' });
    }

    const filter = { location: user.location };

    if (brand) {
      filter.brand = { $regex: brand, $options: 'i' };
    }

    if (type) {
      filter.type = type;
    }

    const total = await Ride.countDocuments(filter);
    const rides = await Ride.find(filter)
      .populate('location', 'name')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();

    res.status(200).json({
      vehicles: rides,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching staff vehicles:', error);
    res.status(500).json({ message: 'Failed to fetch vehicles for staff.' });
  }
};


exports.getAllVehicles = async (req, res) => {
  const { brand, location, type, page = 1, limit = 20 } = req.query;
  const filter = {};

  if (brand) {
    filter.brand = { $regex: brand, $options: 'i' };
  }
  if (location) {
    filter.location = location;
  }
  if (type) {
    filter.type = type;
  }

  try {
    const total = await Ride.countDocuments(filter);
    const rides = await Ride.find(filter)
      .populate('location', 'name')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();

    res.status(200).json({
      vehicles: rides,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Vehicles.' });
  }
};
