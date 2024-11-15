const express = require('express');
const router = express.Router();

// Correct path to vehicle controller
const vehicle_controller = require('../controllers/vehicles'); 

// Define routes
router.get('/vehicles', vehicle_controller.getAllDocuments);  // Get all vehicles
router.post('/vehicles', vehicle_controller.vehicle_create_post);  // Create new vehicle
router.get('/vehicles/:id', vehicle_controller.vehicle_detail);  // Get vehicle by ID

router.put('/resource/vehicles/:id', vehicle_controller.vehicle_update_put); // Update vehicle
router.delete('/vehicles/:id', vehicle_controller.vehicle_delete);  // Delete vehicle
// GET request for one vehicle.
router.get('/vehicles/:id', vehicle_controller.vehicle_detail);
module.exports = router;
