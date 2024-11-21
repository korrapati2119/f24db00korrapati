const express = require('express');
const router = express.Router();

// Require the vehicles controller
const vehiclesController = require('../controllers/vehiclesController');

// API Routes for Vehicle resource

// GET: List all vehicles
router.get('/vehicles', vehiclesController.getAllDocuments);

// POST: Create a new vehicle
router.post('/vehicles', vehiclesController.vehicle_create_post);

// GET: Retrieve details of a specific vehicle by ID
router.get('/vehicles/:id', vehiclesController.vehicle_detail);

// PUT: Update a specific vehicle by ID
router.put('/vehicles/:id', vehiclesController.vehicle_update_put);

// DELETE: Delete a specific vehicle by ID
router.delete('/vehicles/:id', vehiclesController.vehicle_delete);

// Page Routes for Vehicle resource (if you are serving HTML pages)

// GET: View all vehicles (HTML page)
router.get('/vehicles/all', vehiclesController.vehicles_view_all_Page);

// GET: View a single vehicle's detail page
router.get('/vehicles/detail', vehiclesController.vehicles_view_one_Page);

// GET: Render form to create a vehicle
router.get('/vehicles/create', vehiclesController.vehicles_create_get);

// GET: Render form to update a vehicle
router.get('/vehicles/update', vehiclesController.vehicles_update_get);

// GET: Render form to delete a vehicle
router.get('/vehicles/delete', vehiclesController.vehicles_delete_get);

module.exports = router;
