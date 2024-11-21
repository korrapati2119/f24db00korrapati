const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehiclesController');

// Route to create a new vehicle
router.post('/vehicles', vehiclesController.vehicle_create_post);

// Route to fetch all vehicles
router.get('/vehicles', vehiclesController.getAllDocuments);

// Route to get a specific vehicle by ID
router.get('/vehicles/:id', vehiclesController.vehicle_detail);

// Route to update a vehicle by ID
router.put('/vehicles/:id', vehiclesController.vehicle_update_put);

// Route to delete a vehicle by ID
router.delete('/vehicles/:id', vehiclesController.vehicle_delete);

module.exports = router;
