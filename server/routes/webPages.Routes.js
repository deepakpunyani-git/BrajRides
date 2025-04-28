const express = require('express');
const router = express.Router();
const CLIENT_URL = process.env.CLIENT_URL;
const Location = require('../models/Location');

router.get("/", async (req, res) => {

  res.render('index', {title:'BrajRides | Home' , site:CLIENT_URL  });
});

router.get("/login", (req, res) => {
  res.render('login', { title:'BrajRides | Login', site:CLIENT_URL  });
});


/* Dashboard Pages */
router.get("/dashboard", (req, res) => {
  res.render('dashboard', { title:'BrajRides | Dashboard' , site:CLIENT_URL });
});


router.get("/dashboard/location", async (req, res) => {
  res.render('location', { title:'BrajRides | Location Management', site:CLIENT_URL  });
});

router.get("/dashboard/bookings", async (req, res) => {
  const locations = await Location.find();

  res.render('orders', { title:'BrajRides | Bookings Management', site:CLIENT_URL , locations:locations  });
});

router.get("/dashboard/staff", async (req, res) => {
  const locations = await Location.find();

  res.render('staff', { title:'BrajRides | Staff Management', site:CLIENT_URL , locations:locations  });
});


router.get("/dashboard/vehicles", async (req, res) => {
  const locations = await Location.find();
  res.render('vehicle', { title:'BrajRides | Vehicle Management', site:CLIENT_URL , locations:locations  });
});


router.get("/dashboard/clients", (req, res) => {
  res.render('clients', { title:'BrajRides | Clients Management' , site:CLIENT_URL  });
});

router.get("/dashboard/update-password", (req, res) => {
  res.render('password-change', { title:'BrajRides | Update Password' , site:CLIENT_URL });
});

router.get("/dashboard/profile", (req, res) => {
  res.render('profile', { title:'BrajRides | Profile' ,  site:CLIENT_URL});
});

router.get("/dashboard/staff-profile", (req, res) => {
  res.render('staff-profile', { title:'BrajRides | Profile' , site:CLIENT_URL });
});

module.exports = router;
