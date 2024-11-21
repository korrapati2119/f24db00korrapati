// Import the Vehicle model
const Vehicle = require('../models/vehicles');

// Handle GET request to fetch all vehicles
exports.vehicle_list = async function (req, res) {
  try {
    const vehicles = await Vehicle.find();
    res.send(vehicles);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Display all vehicles page
exports.vehicle_view_all_Page = async function (req, res) {
  try {
    const vehicles = await Vehicle.find();
    res.render('vehicles', { title: 'Vehicles', results: vehicles });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Display details of a specific vehicle
exports.vehicle_detail = async function (req, res) {
  try {
    const result = await Vehicle.findById(req.params.id);
    if (!result) {
      res.status(404).send({ error: `Vehicle with ID ${req.params.id} not found` });
    } else {
      res.send(result);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Handle Vehicle creation on POST
exports.vehicle_create_post = async function (req, res) {
  try {
    const newVehicle = new Vehicle({
      vehicle_name: req.body.vehicle_name,
      price: req.body.price,
      functionality: req.body.functionality,
    });
    const result = await newVehicle.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Handle Vehicle delete
exports.vehicle_delete = async function (req, res) {
  try {
    const result = await Vehicle.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(404).send({ error: `Vehicle with ID ${req.params.id} not found` });
    } else {
      res.send({ message: `Vehicle with ID ${req.params.id} deleted successfully` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Handle Vehicle update on PUT
exports.vehicle_update_put = async function (req, res) {
  try {
    const vehicleToUpdate = await Vehicle.findById(req.params.id);
    if (!vehicleToUpdate) {
      return res.status(404).send({ error: `Vehicle with ID ${req.params.id} not found` });
    }

    if (req.body.vehicle_name) vehicleToUpdate.vehicle_name = req.body.vehicle_name;
    if (req.body.price) vehicleToUpdate.price = req.body.price;
    if (req.body.functionality) vehicleToUpdate.functionality = req.body.functionality;

    const result = await vehicleToUpdate.save();
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Render the vehicle create form
exports.vehicle_create_Page = function (req, res) {
  try {
    res.render('vehiclecreate', { title: 'Create Vehicle' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Render the vehicle update form
exports.vehicle_update_Page = async function (req, res) {
  try {
    const result = await Vehicle.findById(req.query.id);
    if (!result) {
      res.status(404).send({ error: `Vehicle with ID ${req.query.id} not found` });
    } else {
      res.render('vehicleupdate', { title: 'Update Vehicle', toShow: result });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Render the vehicle delete form
exports.vehicle_delete_Page = async function (req, res) {
  try {
    const result = await Vehicle.findById(req.query.id);
    if (!result) {
      res.status(404).send({ error: `Vehicle with ID ${req.query.id} not found` });
    } else {
      res.render('vehicledetaildelete', { title: 'Delete Vehicle', toShow: result });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Render a single vehicle view
exports.vehicle_view_one_Page = async function (req, res) {
  try {
    const result = await Vehicle.findById(req.query.id);
    if (!result) {
      res.status(404).send({ error: `Vehicle with ID ${req.query.id} not found` });
    } else {
      res.render('vehiclesdetail', { title: 'Vehicle Detail', toShow: result });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
