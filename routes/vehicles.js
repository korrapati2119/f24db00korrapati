const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicles');

router.get('/all', vehicleController.vehicle_list); // List all vehicles
router.get('/detail', vehicleController.vehicle_detail); // Vehicle detail by ID
router.post('/create', vehicleController.vehicle_create_post); // Create a vehicle
router.put('/:id', vehicleController.vehicle_update_put); // Update vehicle by ID
router.delete('/:id', vehicleController.vehicle_delete); // Delete vehicle by ID

// API routes
router.post('/vehicles', vehicleController.vehicle_create_post);
router.get('/vehicles', vehicleController.vehicle_list);
router.get('/vehicles/:id', vehicleController.vehicle_detail);
router.put('/vehicles/:id', vehicleController.vehicle_update_put);
router.delete('/vehicles/:id', vehicleController.vehicle_delete);

// Web routes
router.get('/vehicles/all', vehicleController.vehicle_view_all_Page);
router.get('/vehicles/create', vehicleController.vehicle_create_Page);
router.get('/vehicles/detail', vehicleController.vehicle_view_one_Page);
router.get('/vehicles/delete', vehicleController.vehicle_delete_Page);
router.get('/vehicles/update', vehicleController.vehicle_update_Page);

module.exports = router;
