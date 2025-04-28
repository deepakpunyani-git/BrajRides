const Location = require('../models/Location');

const addLocation = async (req, res) => {
  try {
    const { name, address, phone, email, mapLink } = req.body;
    const newLocation = new Location({ name, address, phone, email, mapLink });
    await newLocation.save();
    res.status(201).json({ success: true, message: 'Location added successfully', data: newLocation });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add location', error: error.message });
  }
};

const listLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json({ success: true, data: locations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch locations', error: error.message });
  }
};

const updateLocation = async (req, res) => {
  try {
    const locationId = req.params.id;
    const updatedLocation = await Location.findByIdAndUpdate(locationId, req.body, { new: true });
    if (!updatedLocation) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }
    res.status(200).json({ success: true, message: 'Location updated successfully', data: updatedLocation });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update location', error: error.message });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const locationId = req.params.id;
    const deletedLocation = await Location.findByIdAndDelete(locationId);
    if (!deletedLocation) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }
    res.status(200).json({ success: true, message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete location', error: error.message });
  }
};

module.exports = { addLocation, listLocations, updateLocation, deleteLocation };
