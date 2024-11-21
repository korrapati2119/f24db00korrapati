const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehiclesController');
// Define routes
router.get('/resource/vehicles', vehicleController.getAllDocuments);  // Get all vehicles
router.post('/resource/vehicles', vehicleController.vehicle_create_post);  // Create new vehicle
router.get('/resource/vehicles/:id', vehicleController.vehicle_detail);  // Get vehicle by ID
router.put('/resource/vehicles/:id', vehicleController.vehicle_update_put);  // Update vehicle
router.delete('/resource/vehicles/:id', vehicleController.vehicle_delete);  // Delete vehicle

module.exports = router;
