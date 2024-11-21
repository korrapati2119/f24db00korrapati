const Vehicle = require('../models/vehicles');

// List all vehicles
exports.vehicle_list = async function (req, res) {
  try {
    const vehicles = await Vehicle.find();
    res.send(vehicles);
  } catch (err) {
    res.status(500).send({ "error": err.message });
  }
};

// View a single vehicle by ID
exports.vehicle_detail = async function (req, res) {
  try {
    const result = await Vehicle.findById(req.params.id);
    if (!result) {
      res.status(404).send({ "error": "Vehicle not found" });
    } else {
      res.send(result);
    }
  } catch (err) {
    res.status(500).send({ "error": err.message });
  }
};

// Create a new vehicle
exports.vehicle_create_post = async function (req, res) {
  try {
    const vehicle = new Vehicle({
      vehicle_name: req.body.vehicle_name,
      price: req.body.price,
      functionality: req.body.functionality
    });
    const result = await vehicle.save();
    res.send(result);
  } catch (err) {
    res.status(500).send({ "error": err.message });
  }
};

// Delete a vehicle by ID
exports.vehicle_delete = async function (req, res) {
  try {
    const result = await Vehicle.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(404).send({ "error": "Vehicle not found" });
    } else {
      res.send({ "message": `Vehicle ${req.params.id} deleted successfully` });
    }
  } catch (err) {
    res.status(500).send({ "error": err.message });
  }
};

// Update a vehicle by ID
exports.vehicle_update_put = async function (req, res) {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      res.status(404).send({ "error": "Vehicle not found" });
      return;
    }
    vehicle.vehicle_name = req.body.vehicle_name || vehicle.vehicle_name;
    vehicle.price = req.body.price || vehicle.price;
    vehicle.functionality = req.body.functionality || vehicle.functionality;
    const result = await vehicle.save();
    res.send(result);
  } catch (err) {
    res.status(500).send({ "error": err.message });
  }
};

// Web page for all vehicles
exports.vehicle_view_all_Page = async function (req, res) {
  try {
    const vehicles = await Vehicle.find();
    res.render('vehicles', { title: 'Vehicles', results: vehicles });
  } catch (err) {
    res.status(500).send({ "error": err.message });
  }
};

// Web page for a single vehicle
exports.vehicle_view_one_Page = async function (req, res) {
  try {
    const vehicle = await Vehicle.findById(req.query.id);
    if (!vehicle) {
      res.status(404).send({ "error": "Vehicle not found" });
    } else {
      res.render('vehicledetail', { title: 'Vehicle Detail', toShow: vehicle });
    }
  } catch (err) {
    res.status(500).send({ "error": err.message });
  }
};

// Web page for creating a vehicle
exports.vehicle_create_Page = function (req, res) {
  res.render('vehiclecreate', { title: 'Create Vehicle' });
};

// Web page for deleting a vehicle
exports.vehicle_delete_Page = async function (req, res) {
  try {
    const vehicle = await Vehicle.findById(req.query.id);
    if (!vehicle) {
      res.status(404).send({ "error": "Vehicle not found" });
    } else {
      res.render('vehicledelete', { title: 'Delete Vehicle', toShow: vehicle });
    }
  } catch (err) {
    res.status(500).send({ "error": err.message });
  }
};

// Web page for updating a vehicle
exports.vehicle_update_Page = async function (req, res) {
  try {
    const vehicle = await Vehicle.findById(req.query.id);
    if (!vehicle) {
      res.status(404).send({ "error": "Vehicle not found" });
    } else {
      res.render('vehicleupdate', { title: 'Update Vehicle', toShow: vehicle });
    }
  } catch (err) {
    res.status(500).send({ "error": err.message });
  }
};
