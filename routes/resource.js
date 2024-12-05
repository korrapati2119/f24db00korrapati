// routes/resource.js
const express = require('express');
const router = express.Router();

// Import the vehicle controller
const vehiclesController = require('../controllers/vehicles');

// Middleware for secured routes (ensure user is logged in)
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/login");
};

// API Routes
router.get('/', (req, res) => res.json({ message: "API is working" }));

// Vehicle Routes
router.get('/vehicles', vehiclesController.vehicle_list); // List vehicles
router.get('/vehicles/all', vehiclesController.vehicle_view_all_Page); // View all vehicles page
router.post('/vehicles', vehiclesController.vehicle_create_post); // Create vehicle
router.get('/vehicles/create', secured, vehiclesController.vehicle_create_Page); // Create vehicle page
router.get('/vehicles/update/:id', secured, vehiclesController.vehicle_update_Page); // Update vehicle page

router.put('/vehicles/:id', vehiclesController.vehicle_update_put); // Update vehicle
router.get('/vehicles/detail', vehiclesController.vehicle_view_one_Page); // View vehicle details page
router.get('/vehicles/delete', secured, vehiclesController.vehicle_delete_Page); // Delete vehicle page
router.delete('/vehicles/:id', vehiclesController.vehicle_delete); // Delete vehicle

module.exports = router;
