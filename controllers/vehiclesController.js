const Vehicle = require('../models/vehicles');  // Make sure this path is correct

// Function to handle POST request for creating a new vehicle
const vehicle_create_post = async (req, res) => {
  try {
    const newVehicle = new Vehicle({
      vehicle_name: req.body.vehicle_name,
      price: req.body.price,
      functionality: req.body.functionality
    });

    const savedVehicle = await newVehicle.save();
    res.status(201).json({ message: 'Vehicle created successfully', vehicle: savedVehicle });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create vehicle', error: err.message });
  }
};

// Get all vehicles
const getAllDocuments = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();  // Fetch all vehicles
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching vehicles', error: err.message });
  }
};

// Get a specific vehicle by ID
const vehicle_detail = async (req, res) => {
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
const vehicle_update_put = async (req, res) => {
  try {
    let vehicleToUpdate = await Vehicle.findById(req.params.id);

    if (!vehicleToUpdate) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Update fields if present in the request body
    if (req.body.vehicle_name) vehicleToUpdate.vehicle_name = req.body.vehicle_name;
    if (req.body.price) vehicleToUpdate.price = req.body.price;
    if (req.body.functionality) vehicleToUpdate.functionality = req.body.functionality;

    const updatedVehicle = await vehicleToUpdate.save();
    res.status(200).json(updatedVehicle);
  } catch (err) {
    res.status(500).json({ error: `Update for vehicle ID ${req.params.id} failed.`, details: err.message });
  }
};

// Delete a vehicle by ID
const deleteVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id; // Get vehicle ID from the URL parameter
    const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);

    if (!deletedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json({ message: 'Vehicle deleted successfully', deletedVehicle });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err });
  }
};

// Exporting all controller functions at once
module.exports = {
  vehicle_create_post,
  getAllDocuments,
  vehicle_detail,
  vehicle_update_put,
  deleteVehicle
};
