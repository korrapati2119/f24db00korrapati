const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehiclesController');

// REST API Routes
router.post('/', vehiclesController.vehicle_create_post);            // Create a new vehicle
router.get('/', vehiclesController.getAllDocuments);                // Get all vehicles
router.get('/:id', vehiclesController.vehicle_detail);              // Get a specific vehicle by ID
router.put('/:id', vehiclesController.vehicle_update_put);          // Update a vehicle by ID
router.delete('/:id', vehiclesController.vehicle_delete);           // Delete a vehicle by ID

// Page Rendering Routes
router.get('/vehicle/view', vehiclesController.vehicles_view_one_Page); // Render single vehicle view

// Placeholder Routes (if needed for future functionality)
router.get('/create', vehiclesController.vehicles_create_get);      // Render vehicle creation form (not implemented yet)
router.post('/create', vehiclesController.vehicles_create_post);    // Handle form submission for creation (not implemented yet)

router.get('/update', vehiclesController.vehicles_update_get);      // Render vehicle update form (not implemented yet)
router.post('/update', vehiclesController.vehicles_update_post);    // Handle form submission for update (not implemented yet)

router.get('/delete', vehiclesController.vehicles_delete_get);      // Render vehicle deletion confirmation (not implemented yet)
router.post('/delete', vehiclesController.vehicles_delete_post);    // Handle form submission for deletion (not implemented yet)

module.exports = router;
