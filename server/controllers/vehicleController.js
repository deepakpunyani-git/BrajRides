const Ride = require('../models/Vehicle');  

// Add a new ride
exports.addRide = async (req, res) => {
  try {
    const { brand, model, location, price, isElectric, type } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';  // Store the image URL

    const newRide = new Ride({
      brand,
      model,
      location,
      price,
      isElectric,
      image,
      type,
    });

    await newRide.save();
    res.status(201).json({ message: 'Ride added successfully!', ride: newRide });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add ride.' });
  }
};

// List all rides
exports.getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find().populate('location', 'name').exec(); // Populate location info
    res.status(200).json(rides);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Failed to fetch rides.' });
  }
};

// Update a ride
exports.updateRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { brand, model, location, price, isElectric, type } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image; // Handle new image upload

    const updatedRide = await Ride.findByIdAndUpdate(
      rideId,
      { brand, model, location, price, isElectric, type, image },
      { new: true }
    );

    if (!updatedRide) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    res.status(200).json({ message: 'Ride updated successfully!', ride: updatedRide });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update ride.' });
  }
};

// Delete a ride
exports.deleteRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    const deletedRide = await Ride.findByIdAndDelete(rideId);

    if (!deletedRide) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    res.status(200).json({ message: 'Ride deleted successfully!' });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Failed to delete ride.' });
  }
};


exports.search = async (req, res) => {
  try {
    const { location, startDate, endDate, type, isElectric } = req.body.params;


    if (!location || !startDate || !endDate) {
      return res.status(400).json({ message: 'Location, start date, and end date are required.' });
    }

    const filter = { location };

    if (type) filter.type = type;
    if (typeof isElectric === 'boolean') filter.isElectric = isElectric;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const availableVehicles = await Ride.find({
      ...filter,
      bookings: {
        $not: {
          $elemMatch: {
            $or: [
              { startDate: { $lte: end }, endDate: { $gte: start } }
            ]
          }
        }
      }
    }).populate('location', 'name');

    res.json(availableVehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getPopularVehicles = async (req, res) => {
  try {
    const popularVehicles = await Ride.aggregate([
      // Group by unique brand and model.
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


