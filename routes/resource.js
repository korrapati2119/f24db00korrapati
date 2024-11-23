// routes/resource.js
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Vehicle = require('../models/vehicles');

const api_controller = require('../controllers/api');
const vehiclesController = require('../controllers/vehicles');

// Base API route
router.get('/', api_controller.api);

// Vehicle API routes
router.post('/vehicles', vehiclesController.vehicle_create_post);
router.get('/vehicles', vehiclesController.vehicle_list);
router.get('/vehicles/all', vehiclesController.vehicle_view_all_Page);
router.get('/vehicles/create', vehiclesController.vehicle_create_Page);

// Vehicle details, update, delete routes
router.get('/vehicles/detail', vehiclesController.vehicle_view_one_Page);
router.get('/update', vehiclesController.vehicle_update_Page);
router.get('/vehicles/:id', vehiclesController.vehicle_detail);
router.put('/vehicles/:id', vehiclesController.vehicle_update_put);
router.delete('/vehicles/:id', vehiclesController.vehicle_delete);

module.exports = router;
