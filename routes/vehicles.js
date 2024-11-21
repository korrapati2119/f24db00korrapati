// routes/vehicles.js
const express = require('express');
const router = express.Router();
const {
  vehicle_create_post,
  getAllDocuments,
  vehicle_detail,
  vehicle_update_put,
  deleteVehicle
} = require('../controllers/vehiclesController');

// Route for creating a new vehicle (POST)
router.post('/', vehicle_create_post);

// Route for fetching all vehicles (GET)
router.get('/', getAllDocuments);

// Route for fetching a specific vehicle by ID (GET)
router.get('/:id', vehicle_detail);

// Route for updating a vehicle by ID (PUT)
router.put('/:id', vehicle_update_put);

// Route for deleting a vehicle by ID (DELETE)
router.delete('/:id', deleteVehicle);

module.exports = router;
