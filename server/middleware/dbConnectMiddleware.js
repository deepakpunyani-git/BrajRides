const connectDB = require('../db');

const dbConnectMiddleware = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB connection error:', err.message);
    res.status(500).json({ success: false, message: 'Database connection error' });
  }
};

module.exports = dbConnectMiddleware;