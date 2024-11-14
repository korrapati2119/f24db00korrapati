const Vehicle = require('../models/vehicles');
// List all vehicles
exports.vehicle_create_post = async (req, res) => {
  try {
    const newVehicle = new Vehicle({
      vehicle_name: req.body.vehicle_name,
      vehicle_type: req.body.vehicle_type,
      max_speed: req.body.max_speed,
    });
    const result = await newVehicle.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create vehicle', error: error.message });
  }
};
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
exports.vehicle_create_post = async (req, res) => {
  // Ensure required fields are present in the request body
  if (!req.body.vehicle_name || !req.body.price || !req.body.functionality) {
    return res.status(400).json({ message: "Missing required fields: vehicle_name, price, and functionality" });
  }

  // Create a new vehicle instance
  const newVehicle = new Vehicle({
    vehicle_name: req.body.vehicle_name,
    price: req.body.price,
    functionality: req.body.functionality
  });

  try {
    // Save the vehicle to the database
    const savedVehicle = await newVehicle.save();
    res.status(201).json({ message: 'Vehicle created successfully', vehicle: savedVehicle });
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
const seedVehicles = async () => {
  // Delete all existing vehicles
  await Vehicle.deleteMany();
  // Save them to the database
  await Vehicle.insertMany(vehicles);
  console.log('Vehicles seeded successfully!');
};

seedVehicles().catch(err => console.error(err));
