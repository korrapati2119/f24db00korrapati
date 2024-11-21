// routes/vehicles.js
const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicles');

// View all vehicles
router.get('/', vehicleController.vehicle_view_all_Page);

// Create new vehicle form
router.get('/create', (req, res) => res.render('vehicle_create_form'));

// Delete vehicle form
router.get('/delete', vehicleController.vehicle_delete_Page);

// Export routes
module.exports = router;
