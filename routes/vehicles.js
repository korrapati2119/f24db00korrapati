const mongoose = require('mongoose');
const express = require('express');

const Vehicle = require('../models/vehicles');
const router = express.Router();

const vehiclesController = require('../controllers/vehicles');

console.log('Testing route setup...');
console.log('vehicle_list:', vehiclesController.vehicle_list);

// API Routes
router.get('/', vehiclesController.vehicle_list); // List all vehicles
router.post('/create', vehiclesController.vehicle_create_post); // Create a new vehicle
router.post('/', vehiclesController.vehicle_create);
router.put('/vehicles/:id', vehiclesController.vehicle_update_put); // Update a vehicle
router.post('/delete/:id', vehiclesController.vehicle_delete); // Delete a vehicle


// View Routes
router.get('/create/page', vehiclesController.vehicle_create_Page); // Render Create Page
router.get('/update', vehiclesController.vehicle_update_Page); // Render Update Page
router.get('/detail', vehiclesController.vehicle_detail);// Get vehicle details by ID

router.get('/delete', vehiclesController.vehicle_delete_Page); // Render Delete Page
router.get('/view/page', vehiclesController.vehicle_view_all_Page); // Render All Vehicles Page
router.get('/view/:id', vehiclesController.vehicle_view_one_Page); // Render Single Vehicle Page


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
        { new: true, runValidators: true }
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
