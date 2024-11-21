// routes/resource.js
const express = require('express');
const router = express.Router();
const api_controller = require('../controllers/api');
const vehicleController = require('../controllers/vehicles');

// Base API route
router.get('/', api_controller.api);

// Vehicle API routes
router.post('/vehicles', vehicleController.vehicle_create_post);
router.get('/vehicles', vehicleController.vehicle_list);
router.get('/vehicles/all', vehicleController.vehicle_view_all_Page);
router.get('/vehicles/create', vehicleController.vehicle_create_Page);

// Vehicle details, update, delete routes
router.get('/vehicles/detail', vehicleController.vehicle_view_one_Page);
router.get('/update', vehicleController.vehicle_update_Page);
router.get('/vehicles/:id', vehicleController.vehicle_detail);
router.put('/vehicles/:id', vehicleController.vehicle_update_put);
router.delete('/vehicles/:id', vehicleController.vehicle_delete);

module.exports = router;
