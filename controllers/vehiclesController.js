const Vehicle = require('../models/vehicles');  // Make sure this path is correct

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

// Get all vehicles
exports.getAllDocuments = async function(req, res) {
  try {
    const vehicles = await Vehicle.find();  // Fetch all vehicles
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching vehicles', error: err.message });
  }
};

// Get a specific vehicle by ID
exports.vehicle_detail = async function(req, res) {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching vehicle', message: `Document for ID ${req.params.id} not found` });
  }
};

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
exports.deleteVehicle = async function(req, res) {
  try {
    const vehicleId = req.params.id;
    const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);

    if (!deletedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json({ message: 'Vehicle deleted successfully', deletedVehicle });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err });
  }
};
