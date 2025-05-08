const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const upload = require('../middleware/upload');

const {
  addVehicleValidator,
  updateVehicleValidator,
  validateVehicleSearch,
  validateVehicleFilters
} = require('../validators/vehicleValidator');
const { verifyToken, checkUserType } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

// Routes

router.get('/popularBikes', vehicleController.getPopularVehicles);


router.post(
  '/add',
  verifyToken,
  checkUserType(['admin']),
  upload.single('image'),
  addVehicleValidator,
  validateRequest,
  vehicleController.addVehicle
);

router.get(
  '/list',
  verifyToken,
  checkUserType(['admin']),
  validateVehicleFilters,
  validateRequest,
  vehicleController.getAllVehicles
);

router.get(
  '/by_staff_location',
  verifyToken,
  checkUserType(['staff'], 'STAFF_LOCATION_CHECK'),
  validateVehicleFilters,
  validateRequest,
  vehicleController.getVehiclesForStaff
);

router.put(
  '/update/:id',
  verifyToken,
  checkUserType(['admin']),
  upload.single('image'),  
  updateVehicleValidator,
  validateRequest,
  vehicleController.updateVehicle
);

router.get(
    '/:id',
    verifyToken,
    checkUserType(['admin','staff']),
    vehicleController.getVehicleById
  );

router.delete(
  '/delete/:id',
  verifyToken,
  checkUserType(['admin']),
  vehicleController.deleteVehicle
);


router.post(
  '/search',
  validateVehicleSearch,
  validateRequest,
  vehicleController.search
);



module.exports = router;
