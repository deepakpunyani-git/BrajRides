const express = require('express');
const router = express.Router();
const { phoneLogin, verifyPhoneOtp, adminStaffLogin } = require('../controllers/authController');
const { phoneLoginValidator, verifyPhoneOtpValidator, adminStaffLoginValidator } = require('../validators/authValidator');
const validateRequest = require('../middleware/validateRequest');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.JWT_SECRET;

// login route (send OTP)
router.post('/login', phoneLoginValidator, validateRequest, phoneLogin);

// Verify OTP route
router.post('/verify-otp', verifyPhoneOtpValidator, validateRequest, verifyPhoneOtp);

// Admin/Staff login route
router.post('/admin-login', adminStaffLoginValidator, validateRequest, adminStaffLogin);

router.get('/verify-token', (req, res) => {
    const token = req.headers.authorization;
    let requestedUrl = req.headers.location;
    let redirectTo = '/login';
  
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        }
        const user = decoded;
        const dashboardMenu = [];
        redirectTo = '/dashboard';
  
        if (user.usertype === 'admin') {
            dashboardMenu.push(
                { name: 'Dashboard', link: '/dashboard' , show:1},
                { name: 'Manage Location', link: '/dashboard/location' , show:1 },
                { name: 'Manage Vehicles', link: '/dashboard/vehicles' , show:1 },
                { name: 'Manage Bookings', link: '/dashboard/bookings' , show:1 },
                { name: 'Manage Clients', link: '/dashboard/clients' , show:1 },
                { name: 'Manage Staff', link: '/dashboard/staff' , show:1 },
                { name: 'Profile', link: '/dashboard/profile' , show:1 },
                { name: 'Update Password', link: '/dashboard/update-password' , show:1 }
  
            );
        } else if (user.usertype === 'staff') {
            dashboardMenu.push(
                { name: 'Dashboard', link: '/dashboard', show:1  },
                { name: 'Manage Vehicles', link: '/dashboard/vehicles' , show:1 },
                { name: 'Manage Bookings', link: '/dashboard/bookings' , show:1 },
                { name: 'Profile', link: '/dashboard/staff-profile' , show:1 },

            );
        } 

        requestedUrl = requestedUrl.replace(/\/$/, '');

        if (requestedUrl && !dashboardMenu.some(item => item.link === requestedUrl)) {
            return res.status(403).json({ success: false, message: 'Forbidden: Access to this page is not allowed' , redirectTo });
        }
  
        return res.status(200).json({ message: 'Token Verified', menu: dashboardMenu });
    });
  });
  
  router.get('/verify-token-expiry', (req, res) => {
      const token = req.headers.authorization;
      const requestedUrl = req.headers.location;
   
      if (!token) {
          return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
      }
    
      jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
              return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
          }
    
          return res.status(200).json({ message: 'Token Verified' });
      });
    });


module.exports = router;
