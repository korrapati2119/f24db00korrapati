const express = require('express');
const router = express.Router();

const vehiclesController = require('../controllers/vehicles');
const Vehicle = require('../models/vehicles'); // Your vehicle model

// Route to display all vehicles
router.get('/', async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find(); // Fetch all vehicles from the database
        res.render('vehicles', { title: 'Vehicle List', results: vehicles }); // Render the 'vehicles' view
    } catch (err) {
        next(err); // If there is an error, pass it to the error handler
    }
});

// Route to display the update form for a specific vehicle
router.get('/update/:id', async (req, res) => {
  try {
      const vehicle = await Vehicle.findById(req.params.id);
      if (!vehicle) {
          return res.status(404).send('Vehicle not found');
      }
      res.render('vehicleUpdate', { vehicle }); // Render the update form with the vehicle data
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});

// Update vehicle route (POST method)
router.post('/update/:id', async (req, res) => {
  try {
      const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.redirect(`/vehicles/${updatedVehicle._id}`); // Redirect after successful update
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});

// Route to create a new vehicle
router.post('/create', async (req, res) => {
  try {
      const newVehicle = new Vehicle(req.body);
      await newVehicle.save();
      res.redirect('/vehicles');  // Redirect to the vehicles list after successful creation
  } catch (err) {
      // Send back a custom error message to the form if validation fails
      res.render('vehicleCreate', { 
          error: err.message,  // Error message to be displayed on the form
          vehicle: req.body    // Preserve the form data
      });
  }
});

// Middleware to check for authorized user
const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.redirect("/login"); // Redirect to login if not authenticated
}

// Route to view all vehicles in a web page
router.get('/', vehiclesController.vehicle_view_all_Page);
router.get('/create', (req, res) => res.render('vehicle_create_form'));

router.get('/vehicles', vehiclesController.vehicle_list);

/* GET delete vehicle page */
router.get('/vehicles/delete', secured, vehiclesController.vehicle_delete_Page);

module.exports = router;
