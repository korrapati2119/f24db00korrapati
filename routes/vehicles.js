const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehicles');

console.log('Testing route setup...');
console.log('vehicle_list:', vehiclesController.vehicle_list);

// API Routes
router.get('/', vehiclesController.vehicle_list); // List all vehicles
router.post('/create', vehiclesController.vehicle_create_post); // Create a new vehicle
router.post('/', vehiclesController.vehicle_create);
router.get('/:id', vehiclesController.vehicle_detail); // Get vehicle details by ID
router.put('/:id', vehiclesController.vehicle_update_put); // Update a vehicle
router.delete('/:id', vehiclesController.vehicle_delete); // Delete a vehicle

// View Routes
router.get('/create/page', vehiclesController.vehicle_create_Page); // Render Create Page
router.get('/update/page', vehiclesController.vehicle_update_Page); // Render Update Page
router.get('/delete/page', vehiclesController.vehicle_delete_Page); // Render Delete Page
router.get('/view/page', vehiclesController.vehicle_view_all_Page); // Render All Vehicles Page
router.get('/view/:id', vehiclesController.vehicle_view_one_Page); // Render Single Vehicle Page

module.exports = router;
