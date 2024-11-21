const express = require('express');
const router = express.Router();
const vehiclesControllers = require('../controllers/vehiclesController');

// Route to create a new vehicle
router.post('/', vehiclesController.vehicle_create_post);  // Create new vehicle

// Route to fetch all vehicles
router.get('/', vehiclesController.getAllDocuments);  // Get all vehicles

// Route to get a specific vehicle by ID
router.get('/:id', vehiclesController.vehicle_detail);  // Get vehicle by ID

// Route to update a vehicle by ID
router.put('/:id', vehiclesController.vehicle_update_put);  // Update vehicle by ID

// Route to delete a vehicle by ID
router.delete('/:id', vehiclesController.vehicle_delete);  // Delete vehicle by ID

/* GET detail vehicle page */
router.get('/detail', vehiclesController.vehicles_view_one_Page); // Handle a show one view with id specified by query
router.get('/vehicle/view', vehiclesController.vehicles_view_one_Page);

router.get('/create', vehiclesController.vehicles_create_get);
router.post('/create', vehiclesController.vehicles_create_post);

router.get('/update', vehiclesController.vehicles_update_get);
router.post('/update', vehiclesController.vehicles_update_post);

router.get('/delete', vehiclesController.vehicles_delete_get);
router.post('/delete', vehiclesController.vehicles_delete_post);

module.exports = router;
