const moment = require('moment');
const User = require('../models/User');

exports.getDashboard = async (req, res) => {
  try {
    const user = req.user;

    let today = moment().startOf('day');
    let weekStart = moment().startOf('week');
    let weekEnd = moment().endOf('week');
    let response = {};

    if (user.userType === 'admin') {
      let totalClients = await User.countDocuments({ userType: 'client' });
      let totalStaff = await User.countDocuments({ userType: 'staff' });
      let last10NewUsers = await User.find({}).select('name email').sort({ dateCreated: -1 }).limit(10);

      response = {
        totalClients,
        totalStaff,
        last10NewUsers,
      };
    } else if (user.userType === 'staff') {
      let totalClients = await User.countDocuments({ userType: 'client' });
      let last10NewUsers = await User.find({}).sort({ dateCreated: -1 }).limit(10);

      response = {
        totalClients,
        last10NewUsers,
        unreadMsgCount
      };
    } 

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving dashboard data', error });
  }
};
