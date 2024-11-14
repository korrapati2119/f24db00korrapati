var express = require('express');
var router = express.Router();

const api_controller = require('../controllers/api');
const vehicle_controller = require('../controllers/vehicles'); // Make sure the path is correct

// API Route - Overview of supported routes
router.get('/', api_controller.api);

router.get('/vehicles', vehicle_controller.getAllDocuments);

// Vehicle Routes
router.get('/resource/vehicles', vehicles_controller.getAllDocuments);  // List all vehicles
router.post('/resource/vehicles', vehicles_controller.vehicle_create_post); // Create a new vehicle
router.get('/resource/vehicles/:id', vehicles_controller.vehicle_detail); // View a single vehicle by ID
router.put('/resource/vehicles/:id', vehicles_controller.vehicle_update_put); // Update a vehicle by ID
router.delete('/resource/vehicles/:id', vehicles_controller.vehicle_delete); // Delete a vehicle by ID

module.exports = router;
