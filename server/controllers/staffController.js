const Staff = require('../models/User');
const { validationResult } = require('express-validator');

const saltRounds = parseInt(process.env.saltRounds);
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

// Add staff
exports.addStaff = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
    const { name, username, password  , location } = req.body;
      
      const existingStaff = await Staff.findOne({ username });
      if (existingStaff) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const staff = new Staff({ name, username, password:hashedPassword , location , createdBy:req.user._id,userType:'staff' });
      await staff.save();
      res.status(201).send(staff);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  

// Change password
exports.changePassword = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).send();
    }

    
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    staff.password = hashedPassword;
    await staff.save();
    res.send(staff);
  } catch (error) {
    res.status(400).send(error);
  }
};


// Delete staff
exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findByIdAndDelete(id);
    if (!staff) {
      return res.status(404).send();
    }
    res.send(staff);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getStaffList = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      
      const { sortOrder } = req.query;
      let sortOption = { name: 1 }; // Default sort order is ascending
  
      if (sortOrder === 'desc') {
        sortOption = { name: -1 }; // Sort order is descending
      }
  
      const staffList = await Staff.find({userType:'staff'})
        .select('name username location block_user status dateCreated dateUpdated gender')
        .populate('location', 'name')
        .sort(sortOption);
      res.send(staffList);
    } catch (error) {
      res.status(400).send(error);
    }
  }

// Change location
exports.changeLocation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params; 
    const { location } = req.body;

    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    // Update the location
    staff.location = location;
    staff.dateUpdated = Date.now(); 
    await staff.save();

    res.status(200).json({ message: 'Location updated successfully', staff });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};