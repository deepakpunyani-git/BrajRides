const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  mapLink: { type: String }
});

module.exports = mongoose.model('RidesLocation', LocationSchema);
