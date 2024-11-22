const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehicles');

router.get('/', vehicleController.vehicle_list); // List all vehicles
router.get('/detail', vehicleController.vehicle_detail); // Vehicle detail by ID
router.post('/', vehicleController.vehicle_create_post); // Create a vehicle
router.put('/:id', vehicleController.vehicle_update_put); // Update vehicle by ID
router.delete('/:id', vehicleController.vehicle_delete); // Delete vehicle by ID

router.get('/create', vehicleController.vehicle_create_get);
router.post('/create', vehicleController.vehicle_create_post);
// API Routes
router.get('/', vehiclesController.vehicle_list); // List all vehicles
router.post('/create', vehiclesController.vehicle_create_post); // Create a new vehicle
router.get('/:id', vehiclesController.vehicle_detail); // Get vehicle details by ID
router.put('/:id', vehiclesController.vehicle_update_put); // Update a vehicle
router.delete('/:id', vehiclesController.vehicle_delete); // Delete a vehicle

// View Routes
router.get('/create/page', vehiclesController.vehicle_create_Page); // Render Create Page
router.get('/update/page', vehiclesController.vehicle_update_Page); // Render Update Page
router.get('/delete/page', vehiclesController.vehicle_delete_Page); // Render Delete Page
router.get('/view/page', vehiclesController.vehicle_view_one_Page); // Render Single Vehicle Detail Page

module.exports = router;
