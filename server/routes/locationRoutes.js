const express = require('express');
const router = express.Router();
const { addLocation, listLocations, updateLocation, deleteLocation } = require('../controllers/locationController');
const locationValidator = require('../validators/locationValidator');
const validateRequest = require('../middleware/validateRequest');
const {verifyToken,checkUserType} = require('../middleware/authMiddleware'); 

router.post('/add',  verifyToken ,checkUserType(['admin']), locationValidator, validateRequest, addLocation);

router.get('/list', listLocations);

router.put('/update/:id',  verifyToken ,checkUserType(['admin']), locationValidator, validateRequest, updateLocation);

router.delete('/delete/:id',  verifyToken ,checkUserType(['admin']), deleteLocation);

module.exports = router;
