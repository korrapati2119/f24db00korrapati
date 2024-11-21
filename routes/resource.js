const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehiclesController');

// List all vehicles
router.get('/', vehiclesController.getAllDocuments);

module.exports = router;
