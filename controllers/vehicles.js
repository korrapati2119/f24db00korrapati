const Vehicle = require('../models/vehicles');

// controllers/vehiclesController.js

// Function to handle GET request for fetching all vehicles
const getAllDocuments = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();  // Fetch all vehicles from the database
    res.status(200).json(vehicles);  // Respond with the vehicles in JSON format
  } catch (err) {
    res.status(500).json({ message: 'Error fetching vehicles', error: err.message });
  }
};

module.exports = { getAllDocuments };


// Create a new vehicle
exports.vehicle_create_post = async function(req, res) {
  if (!req.body.vehicle_name || !req.body.vehicle_type || !req.body.max_speed) {
    return res.status(400).json({ message: "Missing required fields: vehicle_name, vehicle_type, and max_speed" });
  }

  const newVehicle = new Vehicle({
    vehicle_name: req.body.vehicle_name,
    vehicle_type: req.body.vehicle_type,
    max_speed: req.body.max_speed,
  });

  try {
    const savedVehicle = await newVehicle.save();
    res.status(201).json({ message: 'Vehicle created successfully', vehicle: savedVehicle });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create vehicle', error: err.message });
  }
};

// Export the create function
module.exports = { vehicle_create_post };

// controllers/vehiclesController.js

// Function to handle GET request for a specific vehicle by ID
const vehicle_detail = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);  // Fetch a specific vehicle by ID
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });  // Handle if vehicle not found
    }
    res.json(vehicle);  // Respond with the vehicle details in JSON format
  } catch (err) {
    res.status(500).json({ error: 'Error fetching vehicle', message: `Document for ID ${req.params.id} not found` });
  }
};

module.exports = { vehicle_detail };


// Update a vehicle by ID
exports.vehicle_update_put = async function(req, res) {
  try {
    let vehicleToUpdate = await Vehicle.findById(req.params.id);

    if (!vehicleToUpdate) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Update fields if present in the request body
    if (req.body.vehicle_name) vehicleToUpdate.vehicle_name = req.body.vehicle_name;
    if (req.body.vehicle_type) vehicleToUpdate.vehicle_type = req.body.vehicle_type;
    if (req.body.max_speed) vehicleToUpdate.max_speed = req.body.max_speed;

    // Handle optional checkbox for 'sale' status
    if (req.body.checkboxsale !== undefined) {
      vehicleToUpdate.sale = req.body.checkboxsale;
    }

    const updatedVehicle = await vehicleToUpdate.save();
    res.status(200).json(updatedVehicle);
  } catch (err) {
    res.status(500).json({ error: `Update for vehicle ID ${req.params.id} failed.`, details: err.message });
  }
};

// Delete a vehicle by ID
exports.vehicle_delete = async function(req, res) {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(204).send();  // Successful deletion, no content to return
  } catch (err) {
    res.status(500).json({ message: "Error deleting vehicle", error: err.message });
  }
};
