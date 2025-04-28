const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  brand: { type: String},
  model: { type: String},
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'RidesLocation' }, 
  price: { type: Number},
  isElectric: { type: Boolean, default: false },
  image: { type: String },
  type: { type: String, enum: ['scooty', 'bike'] },
  createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'RidesUser' },
  dateCreated: { type: Date, default: Date.now },
  updatedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'RidesUser' },
  dateUpdated: { type: Date },
  popularity: { type: Number, default: 0 } 
});

module.exports = mongoose.model('RidesVehicle', VehicleSchema);
