const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { listClientsValidator } = require('../validators/clientValidator');
const { verifyToken, checkUserType } = require('../middleware/authMiddleware');

// List clients
router.get('/api/clients', verifyToken, checkUserType(['admin']), listClientsValidator, clientController.listClients);

module.exports = router;
