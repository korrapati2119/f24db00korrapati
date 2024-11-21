const express = require('express');
const router = express.Router();

// Require the vehicles controller
const api_controller = require('../controllers/api');
const vehiclesController = require('../controllers/vehicles');

router.get('/', api_controller.api);

// API routes for vehicles
router.post('/vehicles', vehiclesController.vehicles_create_post);
router.get('/vehicles', vehiclesController.vehicles_list);
router.get('/vehicles/all', vehiclesController.vehicles_view_all_Page);
/* GET create vehicles page */
router.get('/vehicles/create', vehiclesController.vehicles_create_Page);

// GET detail page for a specific vehicle (using query parameter)
router.get('/vehicles/detail', vehiclesController.vehicles_view_one_Page);
/* GET update page for vehicle */
router.get('/update', vehiclesController.vehicles_update_Page);
router.get('/vehicles/:id', vehiclesController.vehicles_detail);
router.put('/vehicles/:id', vehiclesController.vehicles_update_put);
router.delete('/vehicles/:id', vehiclesController.vehicles_delete);

module.exports = router;