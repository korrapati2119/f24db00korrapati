const express = require('express');
const router = express.Router();

const api_controller = require('../controllers/api');
const vehicle_controller = require('../controllers/vehicle'); // Make sure the path is correct

// API Route - Overview of supported routes
router.get('/', api_controller.api);

// Vehicle Routes
router.get('/resource/vehicle', vehicle_controller.getAllDocuments);  // List all vehicles
router.post('/resource/vehicle', vehicle_controller.vehicle_create_post); // Create a new vehicle
router.get('/resource/vehicle/:id', vehicle_controller.vehicle_detail); // View a single vehicle by ID
router.put('/resource/vehicle/:id', vehicle_controller.vehicle_update_put); // Update a vehicle by ID
router.delete('/resource/vehicle/:id', vehicle_controller.vehicle_delete); // Delete a vehicle by ID

module.exports = router;
