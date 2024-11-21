const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehicles');

// API Routes
router.get('/', vehiclesController.vehicle_list);
router.post('/create', vehiclesController.vehicle_create_post);
router.get('/:id', vehiclesController.vehicle_detail);
router.put('/:id', vehiclesController.vehicle_update_put);
router.delete('/:id', vehiclesController.vehicle_delete);

// View Routes
router.get('/create/page', vehiclesController.vehicle_create_Page);
router.get('/update/page', vehiclesController.vehicle_update_Page);
router.get('/delete/page', vehiclesController.vehicle_delete_Page);
router.get('/view/page', vehiclesController.vehicle_view_one_Page);

module.exports = router;
