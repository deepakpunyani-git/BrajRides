const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const { addRideValidator, updateRideValidator , validateVehicleSearch } = require('../validators/vehicleValidator');
const { verifyToken, checkUserType } = require('../middleware/authMiddleware');
const multer = require('multer');
const validateRequest = require('../middleware/validateRequest');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add', verifyToken, checkUserType(['admin']),validateRequest, upload.single('image'), addRideValidator, vehicleController.addRide);
router.get('/list', verifyToken, checkUserType(['admin']), vehicleController.getAllRides);
router.put('/update/:id', verifyToken, checkUserType(['admin']), validateRequest, upload.single('image'), updateRideValidator, vehicleController.updateRide);
router.delete('/delete/:id', verifyToken, checkUserType(['admin']), vehicleController.deleteRide);

router.get("/popular", vehicleController.getPopularVehicles);
router.post("/search", validateRequest , validateVehicleSearch , vehicleController.search);



module.exports = router;
