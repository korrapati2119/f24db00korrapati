const express = require('express');
const router = express.Router();

// Import the controller correctly
const vehiclesController = require('../controllers/vehiclesController');

// Define the routes
router.get('/resource/vehicles', vehiclesController.getAllDocuments);  // Get all vehicles
router.post('/resource/vehicles', vehiclesController.vehicle_create_post);  // Create a new vehicle
router.get('/resource/vehicles/:id', vehiclesController.vehicle_detail);  // Get vehicle by ID
router.put('/resource/vehicles/:id', vehiclesController.vehicle_update_put);  // Update a vehicle by ID
router.delete('/resource/vehicles/:id', vehiclesController.vehicle_delete);  // Delete a vehicle by ID

module.exports = router;
