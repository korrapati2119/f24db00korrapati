const Vehicle = require('../models/vehicles');
// List all vehicles
exports.vehicle_create_post = async function(req, res) {
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
exports.getAllDocuments = async function(req, res) {
  try {
      const vehicles = await Vehicle.find();  // Example function to fetch all vehicles
      res.status(200).json(vehicles);
  } catch (err) {
      res.status(500).json({ message: 'Error fetching vehicles', error: err.message });
  }
};

// Get a specific vehicle by ID
exports.vehicle_detail = async function(req, res) {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching vehicle' });
  }
};
exports.vehicle_create_post = async function(req, res) {
  if (!req.body.vehicle_name || !req.body.price || !req.body.functionality) {
    return res.status(400).json({ message: "Missing required fields: vehicle_name, price, and functionality" });
  }

  const newVehicle = new Vehicle({
    vehicle_name: req.body.vehicle_name,
    price: req.body.price,
    functionality: req.body.functionality
  });

  try {
    const savedVehicle = await newVehicle.save();
    res.status(201).json({ message: 'Vehicle created successfully', vehicle: savedVehicle });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create vehicle', error: err.message });
  }
};

// Delete a vehicle by ID
exports.vehicle_delete = async function (req, res) {
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
// for a specific Vehicle.
exports.vehicle_detail = async function(req, res) {
  console.log("detail" + req.params.id)
  try {
  result = await Vehicle.findById( req.params.id)
  res.send(result)
  } catch (error) {
  res.status(500)
  res.send(`{"error": document for id ${req.params.id} not found`);
  }
 };
 
 // In vehicles.js controller
exports.vehicle_update_put = async function (req, res) {
  console.log(`Update request for vehicle ID: ${req.params.id}`);
  try {
      let toUpdate = await Vehicle.findById(req.params.id);

      // Update properties if they exist in the request body
      if (req.body.vehicle_name) toUpdate.vehicle_name = req.body.vehicle_name;
      if (req.body.vehicle_type) toUpdate.vehicle_type = req.body.vehicle_type;
      if (req.body.max_speed) toUpdate.max_speed = req.body.max_speed;

      // Handle checkbox for 'sale' status (if applicable)
      if (req.body.checkboxsale !== undefined) 
          toUpdate.sale = req.body.checkboxsale;

      let result = await toUpdate.save();
      console.log("Update Success:", result);
      res.status(200).json(result);
  } catch (err) {
      console.error(`Update Error: ${err}`);
      res.status(500).send({ error: `Update for ID ${req.params.id} failed.` });
  }
};
// Controller for deleting a vehicle
const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params; // Extract the 'id' from request parameters
    if (!id) {
      return res.status(400).json({ error: "Vehicle ID is required." });
    }

    // Find and delete the document by ID
    const deletedVehicle = await Resource.findByIdAndDelete(id);

    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle not found." });
    }

    // Return success message with the deleted document
    return res.status(200).json({
      message: "Vehicle deleted successfully.",
      deletedVehicle: deletedVehicle,
    });
  } catch (error) {
    // Handle malformed ID or other errors
    return res.status(500).json({
      error: "Failed to delete resource.",
      details: error.message,
    });
  }
};
