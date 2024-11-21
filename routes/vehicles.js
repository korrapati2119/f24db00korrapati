const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehiclesController');

// Define the routes
router.post('/vehicles', vehiclesController.vehicle_create_post);
router.get('/vehicles', vehiclesController.getAllDocuments);
router.get('/vehicles/:id', vehiclesController.vehicle_detail);
router.put('/vehicles/:id', vehiclesController.vehicle_update_put);
router.delete('/vehicles/:id', vehiclesController.deleteVehicle);

module.exports = router;
