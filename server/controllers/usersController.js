const User = require('../models/User');
const { validationResult } = require('express-validator');
const saltRounds = parseInt(process.env.saltRounds);
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require("nodemailer");
const {  generateOTP } = require('../helpers');


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.changeUserStatus = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
      const { id } = req.params;
      const { block_user } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(id, { block_user }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
   
      res.status(200).json({ message: 'Status updated successfully' });

    } catch (error) {
      res.status(400).send(error);
    }
  };



exports.getProfileDetails = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
        const user = await User.findById(req.user._id).select('name gender email username');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updatePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid current password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}; 



exports.updateProfile = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, gender, email } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const updateData = { name, gender };


    // Check if email is changed
    if (email && email !== user.email) {

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      
      updateData.email = email;
      updateData.status = 'inactive';
      let otp = generateOTP();
      updateData.email_otp = otp;
      const emailOTPCreatedAt = new Date();
      updateData.email_otp_dateCreated = emailOTPCreatedAt;
      updateData.email_otp_expiresAt = new Date(emailOTPCreatedAt.getTime() + (24 * 60 * 60 * 1000)); 

      // Send verification email
      const verificationLink = `${process.env.CLIENT_URL}/verify-otp?email=${email}`;
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking on the following link: ${verificationLink} , your otp is ${otp}`
      };

      await transporter.sendMail(mailOptions);
    }

    // Update user profile
    await User.findByIdAndUpdate(req.user._id, updateData);

    res.status(200).send({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send({ error: 'Error updating profile' });
  }
};


exports.updateStaffProfile = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, gender } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const updateData = { name, gender };



    // Update user profile
    await User.findByIdAndUpdate(req.user._id, updateData);

    res.status(200).send({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send({ error: 'Error updating profile' });
  }
};
