const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  email: { type: String , unique: true, sparse: true },
  phone: { type: String },
  phone_otp: { type: String },
  phone_otp_dateCreated: { type: Date },
  phone_otp_expiresAt: { type: Date },
  password: { type: String },
  userType: { type: String, enum: ['admin', 'user','staff'], default: 'user' },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date },
  block_user: { type: Boolean, default: false },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'RidesLocation' }, 
});

const RidesUser = mongoose.models.RidesUser || mongoose.model('RidesUser', UserSchema);
module.exports = RidesUser;
