const express = require('express');
const router = express.Router();
const vehicle_controllers = require('../controllers/vehicles');

// Vehicle Routes
router.get('/', vehicle_controllers.getAllDocuments); // List all vehicles
router.post('/', vehicle_controllers.vehicle_create_post); // Create a new vehicle
router.get('/:id', vehicle_controllers.vehicle_detail); // Get vehicle by ID
router.put('/:id', vehicle_controllers.vehicle_update_put); // Update vehicle by ID
router.delete('/:id', vehicle_controllers.vehicle_delete); // Delete vehicle by ID

module.exports = router;
