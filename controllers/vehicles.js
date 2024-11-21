// Import the Vehicle model
const Vehicle = require('../models/vehicles');

// Handle GET request to fetch all vehicles
exports.vehicle_list = async function (req, res) {
  try {
    const vehicles = await Vehicle.find(); // Fetch all vehicles from the database
    res.send(vehicles); // Respond with the vehicles in JSON format
  } catch (err) {
    res.status(500);
    res.send({ "error": err.message });
  }
};

// Display all vehicles page
exports.vehicle_view_all_Page = async function (req, res) {
  try {
    const vehicles = await Vehicle.find();  // Fetch all vehicles from DB
    res.render('vehicles', { title: 'Vehicles', results: vehicles });  // Render vehicles list
  } catch (err) {
    res.status(500).send(`{"error": ${err}}`);  // Handle errors and send response
  }
};

// Display details of a specific vehicle
exports.vehicle_detail = async function (req, res) {
  console.log("Detail of Vehicle with ID:", req.params.id);
  try {
    const result = await Vehicle.findById(req.params.id); // Find the vehicle by ID
    if (!result) {
      res.status(404).send(`{"error": "Vehicle document for ID ${req.params.id} not found"}`);
    } else {
      res.send(result);  // Return the vehicle details
    }
  } catch (err) {
    res.status(500).send(`{"error": "Error retrieving document for ID ${req.params.id}: ${err.message}"}`);
  }
};

// Handle Vehicle create on POST
exports.vehicle_create_post = async function (req, res) {
  console.log(req.body);
  const newVehicle = new Vehicle({
    vehicle_name: req.body.vehicle_name,
    price: req.body.price,
    functionality: req.body.functionality,
  });

  try {
    let result = await newVehicle.save(); // Save the new vehicle
    res.send(result);  // Respond with the created vehicle
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// Handle Vehicle delete view (GET request)
exports.vehicle_delete_Page = async function (req, res) {
  console.log("Delete view for vehicle with ID " + req.query.id);
  try {
    const result = await Vehicle.findById(req.query.id); // Find vehicle by ID
    res.render('vehicledetaildelete', { title: 'Vehicle Delete', toShow: result });  // Render the delete view
  } catch (err) {
    console.error(err);  // Log error
    res.status(500).send(`{'error': '${err}'}`);
  }
};

// Handle Vehicle delete on DELETE
exports.vehicle_delete = async function (req, res) {
  console.log("Deleting Vehicle with ID:", req.params.id);
  try {
    const result = await Vehicle.findByIdAndDelete(req.params.id);  // Delete the vehicle by ID
    if (!result) {
      res.status(404).send(`{"error": "Vehicle document for ID ${req.params.id} not found"}`);
    } else {
      console.log("Removed:", result);
      res.send(`{"message": "Vehicle document with ID ${req.params.id} deleted successfully"}`);
    }
  } catch (err) {
    console.error("Error deleting document:", err);
    res.status(500).send(`{"error": "Error deleting document for ID ${req.params.id}: ${err.message}"}`);
  }
};

// Handle Vehicle update form on PUT
exports.vehicle_update_put = async function (req, res) {
  console.log(`Updating Vehicle with ID: ${req.params.id} and data: ${JSON.stringify(req.body)}`);
  try {
    const vehicleToUpdate = await Vehicle.findById(req.params.id);

    if (!vehicleToUpdate) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Update fields if present in the request body
    if (req.body.vehicle_name) vehicleToUpdate.vehicle_name = req.body.vehicle_name;
    if (req.body.price) vehicleToUpdate.price = req.body.price;
    if (req.body.functionality) vehicleToUpdate.functionality = req.body.functionality;

    const updatedVehicle = await vehicleToUpdate.save();
    res.status(200).json(updatedVehicle);  // Respond with updated vehicle
  } catch (err) {
    res.status(500).json({
      error: `Failed to update vehicle with ID ${req.params.id}.`,
      details: err.message,
    });
  }
};

// Handle showing a single vehicle by ID for viewing
exports.vehicle_view_one_Page = async function (req, res) {
  console.log('Single view for ID ' + req.query.id);
  try {
    const result = await Vehicle.findById(req.query.id);  // Fetch the vehicle by ID
    if (!result) {
      res.status(404).send(`{'error': 'Vehicle not found'}`);
    } else {
      res.render('vehiclesdetail', { title: 'Vehicle Detail', toShow: result });  // Render vehicle details
    }
  } catch (err) {
    res.status(500).send(`{'error': '${err}'}`);
  }
};

// Handle building the view for creating a new vehicle
exports.vehicle_create_Page = function (req, res) {
  console.log("create view");
  try {
    res.render('vehiclecreate', { title: 'Vehicle Create' });  // Render the vehicle create form
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for updating a vehicle (GET request for form)
exports.vehicle_update_Page = async function(req, res) {
  console.log("Update view for vehicle with ID " + req.query.id);
  try {
    let result = await Vehicle.findById(req.query.id);  // Fetch the vehicle by ID
    res.render('vehicleupdate', { title: 'Vehicle Update', toShow: result });  // Render the update form
  } catch (err) {
    res.status(500).send(`{"error": "${err}"}`);
  }
};
