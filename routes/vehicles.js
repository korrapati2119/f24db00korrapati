const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehiclesController'); // Ensure the correct import

// Correct routes for vehicle-related actions
router.post('/', vehiclesController.vehicle_create_post);  // Create new vehicle
router.get('/', vehiclesController.getAllDocuments);  // Get all vehicles
router.get('/:id', vehiclesController.vehicle_detail);  // Get vehicle by ID
router.put('/:id', vehiclesController.vehicle_update_put);  // Update vehicle by ID
router.delete('/:id', vehiclesController.vehicle_delete);  // Delete vehicle by ID

/* GET detail vehicle page */
router.get('/detail', vehiclesController.vehicles_view_one_Page); // Handle a show one view with ID specified by query
router.get('/vehicle/view', vehiclesController.vehicles_view_one_Page);  // Same function but another route

// Additional routes
router.get('/create', vehiclesController.vehicles_create_get); // Render create form
router.post('/create', vehiclesController.vehicles_create_post); // Handle form submission
router.get('/update', vehiclesController.vehicles_update_get); // Render update form
router.post('/update', vehiclesController.vehicles_update_post); // Handle update form submission
router.get('/delete', vehiclesController.vehicles_delete_get); // Render delete form
router.post('/delete', vehiclesController.vehicles_delete_post); // Handle delete form submission

module.exports = router;
