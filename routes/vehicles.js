const express = require('express');
const router = express.Router();
const vehicles_controllers = require('../controllers/vehicles');
const Vehicle = require('../models/vehicles');
const { deleteVehicle } = require('../controllers/vehicleController');
// Vehicle Routes
router.get('/', vehicles_controllers.getAllDocuments); // List all vehicles
router.post('/', vehicles_controllers.vehicle_create_post); // Create a new vehicle
router.get('/:id', vehicles_controllers.vehicle_detail); // Get vehicle by ID
router.put('/:id', vehicles_controllers.vehicle_update_put); // Update vehicle by ID
router.delete('/:id', vehicles_controllers.vehicle_delete); // Delete vehicle by ID
router.delete('/:id', deleteVehicle);

module.exports = router;
module.exports = { deleteVehicle };