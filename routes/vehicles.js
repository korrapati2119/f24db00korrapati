const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehiclesController');

// Use the controller methods in the routes
router.post('/vehicles', vehiclesController.vehicle_create_post);
router.get('/vehicles', vehiclesController.getAllDocuments);
router.get('/vehicles/:id', vehiclesController.vehicle_detail);
router.put('/vehicles/:id', vehiclesController.vehicle_update_put);
router.delete('/vehicles/:id', vehiclesController.vehicle_delete);

module.exports = router;
