// controllers/vehicles.js
const Vehicles = require('../models/vehicles');

// List all vehicles
exports.vehicle_list = async function (req, res) {
  try {
    const vehicles = await Vehicles.find();
    res.send(vehicles);
  } catch (err) {
    res.status(500).send({ "error": err.message });
  }
};

// View all vehicles in a webpage
exports.vehicle_view_all_Page = async function (req, res) {
  try {
    const results = await Vehicles.find();
    res.render('vehicles', { title: 'Vehicles', results: results });
  } catch (err) {
    res.status(500).send(`{"error": ${err}}`);
  }
};

// View one vehicle by ID
exports.vehicle_detail = async function (req, res) {
  console.log("Detail of Vehicle with ID:", req.params.id);
  try {
    const result = await Vehicles.findById(req.params.id);
    if (!result) {
      res.status(404).send(`{"error": "Vehicle document for ID ${req.params.id} not found"}`);
    } else {
      res.send(result);
    }
  } catch (error) {
    res.status(500).send(`{"error": "Error retrieving document for ID ${req.params.id}: ${error.message}"}`);
  }
};

// Create a new vehicle
exports.vehicle_create_post = async function (req, res) {
  console.log(req.body);
  let document = new Vehicles();
  document.vehicle_name = req.body.vehicle_name;
  document.price = req.body.price;
  document.functionality = req.body.functionality;
  try {
    let result = await document.save();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// Delete vehicle page
exports.vehicle_delete_Page = async function (req, res) {
  console.log("Delete view for vehicle with ID " + req.query.id);
  try {
    let result = await Vehicles.findById(req.query.id);
    res.render('vehicledel', { title: 'Vehicle Delete', toShow: result });
  } catch (err) {
    console.error(err);
    res.status(500).send(`{'error': '${err}'}`);
  }
};

// Delete vehicle
exports.vehicle_delete = async function (req, res) {
  console.log("Deleting Vehicle with ID:", req.params.id);
  try {
    const result = await Vehicles.findByIdAndDelete(req.params.id);
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

// Update vehicle details
exports.vehicle_update_put = async function (req, res) {
  console.log(`Updating Vehicle with ID: ${req.params.id} and data: ${JSON.stringify(req.body)}`);
  try {
    let toUpdate = await Vehicles.findById(req.params.id);
    if (req.body.vehicle_name) toUpdate.vehicle_name = req.body.vehicle_name;
    if (req.body.price) toUpdate.price = req.body.price;
    if (req.body.functionality) toUpdate.functionality = req.body.functionality;
    let result = await toUpdate.save();
    console.log("Update successful:", result);
    res.send(result);
  } catch (err) {
    console.error("Error updating document:", err);
    res.status(500).send(`{"error": "Update for ID ${req.params.id} failed: ${err.message}"}`);
  }
};
