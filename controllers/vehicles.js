// Import the Vehicle model
const Vehicle = require('../models/vehicles');

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

// Function to handle GET request for fetching all vehicles
const getAllDocuments = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();  // Fetch all vehicles from the database
    res.status(200).json(vehicles);  // Respond with the vehicles in JSON format
  } catch (err) {
    res.status(500).json({ message: 'Error fetching vehicles', error: err.message });
  }
};

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

// Function to handle PUT request to update a vehicle by ID
const vehicle_update_put = async (req, res) => {
  try {
    const vehicleToUpdate = await Vehicle.findById(req.params.id);
    if (!vehicleToUpdate) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Update fields if present in the request body
    if (req.body.vehicle_name) vehicleToUpdate.vehicle_name = req.body.vehicle_name;
    if (req.body.price) vehicleToUpdate.price = req.body.price;
    if (req.body.functionality) vehicleToUpdate.functionality = req.body.functionality;

    const updatedVehicle = await vehicleToUpdate.save();
    res.status(200).json(updatedVehicle);  // Respond with updated vehicle
  } catch (err) {
    res.status(500).json({ error: `Failed to update vehicle with ID ${req.params.id}.`, details: err.message });
  }
};

// Function to handle DELETE request to delete a vehicle by ID
const vehicle_delete = async (req, res) => {
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

// Handle a show one view with id specified by query
async function vehicles_view_one_Page(req, res) {
  console.log("single view for id " + req.query.id);
  try {
    const result = await Vehicle.findById(req.query.id); // Change `Vehicles` to `Vehicle`
    res.render('vehiclesdetail', { title: 'Vehicle Detail', toShow: result });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
}


// Export all necessary functions at the end
module.exports = {
  vehicle_create_post,
  getAllDocuments,
  vehicle_detail,
  vehicle_update_put,
  vehicle_delete,
  vehicles_view_one_Page
};
