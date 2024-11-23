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

router.post('/update', async (req, res) => {
    try {
      const { id, vehicle_name, functionality, price } = req.body;
  
      // Validate ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: `Invalid ID format: ${id}` });
      }
  
      // Find and update the vehicle
      const updatedVehicle = await Vehicle.findByIdAndUpdate(
        id,
        { vehicle_name, functionality, price },
        { new: true, runValidators: true } // Returns the updated document
      );
  
      if (!updatedVehicle) {
        return res.status(404).send({ error: `Vehicle with ID ${id} not found` });
      }
  
      res.send({ message: 'Vehicle updated successfully', vehicle: updatedVehicle });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
  

module.exports = router;
