const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicles'); // Import the vehicle controller

// Routes for vehicle CRUD operations
router.post('/', vehicleController.vehicle_create_post);  // Create a new vehicle
router.get('/', vehicleController.getAllDocuments);      // Get all vehicles
router.get('/:id', vehicleController.vehicle_detail);    // Get details of a specific vehicle by ID
router.put('/:id', vehicleController.vehicle_update_put); // Update a specific vehicle by ID
router.delete('/:id', vehicleController.vehicle_delete);  // Delete a specific vehicle by ID

// Route to render a view for a single vehicle
router.get('/view/:id', vehicleController.vehicles_view_one_Page);

module.exports = router;
