const Vehicle = require('../models/vehicles');
// List all vehicles
exports.getAllDocuments = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching vehicles' });
  }
};

// Get a specific vehicle by ID
exports.vehicle_detail = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: "Error fetching vehicle details", error: err.message });
  }
};

// Create a new vehicle
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

// Delete a vehicle by ID
exports.vehicle_delete = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Error deleting vehicle", error: err.message });
  }
};

// Update a vehicle by ID
exports.vehicle_update_put = async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(updatedVehicle);
  } catch (err) {
    res.status(500).json({ message: "Error updating vehicle", error: err.message });
  }
};
