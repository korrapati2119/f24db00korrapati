// controllers/vehicle.js
const Vehicle = require('../models/vehicles');

// List all vehicles
exports.vehicle_list = async (req, res)
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vehicles' });
  }

// Get a specific Gadget by ID
exports.vehicle_detail = function(req, res) {
  Vehicle.findById(req.params.id, function(err, vehicle) {
    if (err || !vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.status(200).json(vehicle);
  });
};

// Create a new Vehicle
exports.vehicle_create_post = async (req, res) => {
  const newVehicle = new Vehicle({
    vehicle_name: req.body.vehicle_name,
    price: req.body.price,
    functionality: req.body.functionality
  });
  try {
    await newVehicle.save();
    res.status(201).json({ message: 'Vehicle created successfully', vehicle: newVehicle });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create vehicle', error: err.message });
  }
};

// Delete a Vehicle by ID
exports.vehicle_delete = function(req, res) {
  Vehicle.findByIdAndDelete(req.params.id, function(err) {
    if (err) return res.status(500).json({ message: "Error deleting vehicle" });
    res.status(204).send();
  });
};

// Update a Vehicle by ID
exports.vehicle_update_put = function(req, res) {
  Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, updatedVehicle) {
    if (err) return res.status(500).json({ message: "Error updating vehicle" });
    res.status(200).json(updatedVehicle);
  });
};