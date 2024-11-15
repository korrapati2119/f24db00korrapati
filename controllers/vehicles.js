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
 
// Handle Vehicle update on PUT
exports.vehicle_update_put = async function (req, res) {
  console.log(`Update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
  try {
      let toUpdate = await Vehicle.findById(req.params.id); // Find the vehicle by ID

      // Check if the vehicle exists
      if (!toUpdate) {
          res.status(404).send(`{"error": "Vehicle with id ${req.params.id} not found"}`);
          return;
      }

      // Update the properties if they exist in the request body
      if (req.body.name) toUpdate.name = req.body.name;
      if (req.body.type) toUpdate.type = req.body.type;
      if (req.body.functionality) toUpdate.functionality = req.body.functionality;
      if (req.body.price) toUpdate.price = req.body.price;

      // Save the updated vehicle to the database
      let result = await toUpdate.save();
      console.log("Success " + result);
      res.send(result); // Return the updated vehicle
  } catch (err) {
      console.error(err);
      res.status(500);
      res.send(`{"error": "${err}": Update for id ${req.params.id} failed"}`);
  }
};
