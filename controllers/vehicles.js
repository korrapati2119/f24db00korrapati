const mongoose = require('mongoose');
const Vehicle = require('../models/vehicles');

// List all vehicles
exports.vehicle_list = async function(req, res) {
  try {
    const vehicles = await Vehicle.find();
    res.send(vehicles);
  } catch (err) {
    res.status(500);
    res.send({ "error": err.message });
  }
};

exports.vehicle_create_post = async (req, res) => {
  const { vehicle_name, price, functionality } = req.body;
  try {
    const newVehicle = new Vehicle({
      vehicle_name,
      price,
      functionality,
    });
    const result = await newVehicle.save();

    // If `redirect` is needed, check the condition or remove it.
    if (req.body.redirect) {
      res.redirect('/vehicles'); // Redirect after successful creation
    } else {
      res.status(201).send(result); // Send JSON response
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};



// View a single vehicle by ID
exports.vehicle_detail = async (req, res) => {
  try {
      const vehicle = await Vehicle.findById(req.query.id);
      if (!vehicle) {
          res.status(404).send('Vehicle not found');
      } else {
        res.send(`
          <html>
              <head>
                  <link rel="stylesheet" href="/stylesheets/styles.css"> 
                  <title>Vehicle Details</title>
              </head>
              <body>
                  <h1>Vehicle Details</h1>
                  <h3>Detailed View:</h3>
                  <div class="vehiclesAttr">
                      <div><strong>ID :</strong> ${vehicle._id}</div>
                      <div><strong>Vehicle Name:</strong> ${vehicle.vehicle_name}</div>
                      <div><strong>Functionality:</strong> ${vehicle.functionality}</div>
                      <div><strong>Price:</strong> ${vehicle.price}</div>
                  </div>
              </body>
          </html>
        `);
      }
  } catch (err) {
      res.status(500).send(`{"error": "${err.message}"}`);
  }
};



exports.vehicle_update_put = async function (req, res) {
  try {
    const id = req.params.id;
    const updateData = {
      vehicle_name: req.body.vehicle_name,
      functionality: req.body.functionality,
      price: req.body.price,
    };

    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validations are run
    });

    if (!updatedVehicle) {
      return res.status(404).send({ error: `Vehicle with ID ${id} not found` });
    }

    res.send({ message: 'Update successful', data: updatedVehicle });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// DELETE: Delete a vehicle by ID
exports.vehicle_delete = async (req, res) => {
  try {
      const id = req.params.id;
      
      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).send({ error: `Invalid ID format: ${id}` });
      }

      // Delete the vehicle by ID
      const deletedVehicle = await Vehicle.findByIdAndDelete(id);
      if (!deletedVehicle) {
          return res.status(404).send({ error: `Vehicle with ID ${id} not found` });
      }

      // Redirect or respond with a success message
      res.redirect('/vehicles/view/page'); // Redirect after successful deletion
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
};


// Web page for creating a vehicle
exports.vehicle_create_Page = function (req, res) {
  console.log("Rendering vehicle creation page");
  try {
      res.render('vehiclescreate', { title: 'Create a Vehicle' });
  } catch (err) {
      res.status(500).send(`{'error': '${err}'}`);
  }
};

//for submitted data
exports.vehicle_create = async function (req, res) {
  try {
      const newVehicle = new Vehicle({
          vehicle_name: req.body.vehicle_name,
          functionality: req.body.functionality,
          price: req.body.price,
      });
      const result = await newVehicle.save();
      res.status(201).json({ message: 'Vehicle created successfully', vehicle: result });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
};

// Web page for updating a vehicle

exports.vehicle_update_Page = async function (req, res) {
  try {
    const id = req.query.id;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: `Invalid ID format: ${id}` });
    }

    // Find the vehicle by ID
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).send({ error: `Vehicle with ID ${id} not found` });
    }

    // Render the update page with the vehicle details
    res.render('vehiclesupdate', {
      title: 'Update Vehicle',
      toShow: vehicle
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};



// Web page for deleting a vehicle
exports.vehicle_delete_Page = async (req, res) => {
  try {
      const id = req.query.id;
      console.log("Received ID for deletion:", id);

      // Validate the ID format
      if (!mongoose.Types.ObjectId.isValid(id)) {
          console.error("Invalid ID format:", id);
          return res.status(400).send({ error: `Invalid ID format: ${id}` });
      }

      // Find the vehicle by ID
      const vehicle = await Vehicle.findById(id);
      if (!vehicle) {
          console.error("Vehicle not found for ID:", id);
          return res.status(404).send({ error: `Vehicle not found for ID: ${id}` });
      }

      console.log("Vehicle found:", vehicle);

      // Render the deletion page with the vehicle details
      res.render('vehiclesdelete', { title: 'Vehicle Deletion', toShow: vehicle });
  } catch (err) {
      console.error("Error in vehicle_delete_Page:", err.message);
      res.status(500).send({ error: err.message });
  }
};



// Web page for all vehicles
exports.vehicle_view_all_Page = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.render('vehicles', { title: 'Vehicles', results: vehicles });
  } catch (err) {
    res.status(500).send({ "error": err.message });
  }
};

// Web page for a single vehicle
exports.vehicle_view_one_Page = async (req, res) => {
  try {
      const vehicle = await Vehicle.findById(req.query.id);
      if (!vehicle) {
          res.status(404).send({ "error": "Vehicle not found" });
      } else {
          // Render a view file and pass the vehicle data
          res.render('vehicledetail', { 
              title: 'Vehicle Details Page',
              vehicle: vehicle 
          });
      }
  } catch (err) {
      res.status(500).send({ "error": err.message });
  }
};
