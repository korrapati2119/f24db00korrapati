const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehiclesController');

// This resource route typically lists the vehicles in a generic way
router.get('/vehicles', vehiclesController.getAllDocuments);

module.exports = router;
