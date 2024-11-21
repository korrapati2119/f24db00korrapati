// routes/vehicles.js
const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehiclesController');

// Define the routes
router.post('/vehicles', vehiclesController.vehicle_create_post);  // POST route for creating a new vehicle
router.get('/vehicles', vehiclesController.getAllDocuments);  // GET route for all vehicles
router.get('/vehicles/:id', vehiclesController.vehicle_detail);  // GET route for vehicle by ID
router.put('/vehicles/:id', vehiclesController.vehicle_update_put);  // PUT route for updating vehicle
router.delete('/vehicles/:id', vehiclesController.deleteVehicle);  // DELETE route for vehicle

module.exports = router;
