const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehiclesController');

// Route to create a new vehicle
router.post('/', vehiclesController.vehicle_create_post);  // Create new vehicle

// Route to fetch all vehicles
router.get('/', vehiclesController.getAllDocuments);  // Get all vehicles

// Route to get a specific vehicle by ID
router.get('/:id', vehiclesController.vehicle_detail);  // Get vehicle by ID

// Route to update a vehicle by ID
router.put('/:id', vehiclesController.vehicle_update_put);  // Update vehicle by ID

// Route to delete a vehicle by ID
router.delete('/:id', vehiclesController.vehicle_delete);  // Delete vehicle by ID

module.exports = router;
