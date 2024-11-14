// routes/resource.js
var express = require('express');
var router = express.Router();
module.exports = router;

var api_controller = require('../controllers/api');
var vehicle_controller = require('../controllers/vehicles');

// API Route
router.get('/',api_controller.api);

// Vehicle Routes
router.get('/vehicles', vehicle_controller.vehicle_list);  // List all vehicles
router.post('/vehicles', vehicle_controller.vehicle_create_post); // Create new vehicle
router.get('/vehicles/:id', vehicle_controller.vehicle_detail); // View single vehicle
router.put('/vehicles/:id', vehicle_controller.vehicle_update_put); // Update vehicle
router.delete('/vehicles/:id',vehicle_controller.vehicle_delete); // Delete vehicle

module.exports = router;