const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicles'); // Ensure the correct import

// Correct routes for vehicle-related actions
router.post('/', vehicleController.vehicle_create_post);  // Create new vehicle
router.get('/vehicles', vehicleController.getAllDocuments);  // Get all vehicles
router.get('/:id', vehicleController.vehicle_detail);  // Get vehicle by ID
router.put('/:id', vehicleController.vehicle_update_put);  // Update vehicle by ID
router.delete('/:id', vehicleController.vehicle_delete);  // Delete vehicle by ID

/* GET detail vehicle page */
router.get('/detail', vehiclesController.vehicles_view_one_Page); // Handle a show one view with ID specified by query
router.get('/vehicle/view', vehiclesController.vehicles_view_one_Page);  // Same function but another route
router.get('/view/:id', vehicleController.vehicles_view_one_Page);

module.exports = router;
