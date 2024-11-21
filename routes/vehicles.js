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

router.post('/', vehicle_create_post);
router.get('/', getAllDocuments);
router.get('/:id', vehicle_detail);
router.put('/:id', vehicle_update_put);

module.exports = router;
