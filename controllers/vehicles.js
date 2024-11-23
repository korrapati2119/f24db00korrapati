const Vehicle = require('../models/vehicles');

// List all vehicles
exports.vehicle_list = async function(req, res) {
  try {
    const vehicles = await Vehicle.find();
    res.send(vehicles);
  } catch (err) {
    res.status(500);
    res.send({ "error": err.message });
  }
};

exports.vehicle_create_post = async (req, res) => {
  const { vehicle_name, price, functionality } = req.body;
  try {
    const newVehicle = new Vehicle({
      vehicle_name,
      price,
      functionality,
    });
    const result = await newVehicle.save();

    // If `redirect` is needed, check the condition or remove it.
    if (req.body.redirect) {
      res.redirect('/vehicles'); // Redirect after successful creation
    } else {
      res.status(201).send(result); // Send JSON response
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};



// View a single vehicle by ID
exports.vehicle_detail = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).send({ "error": `Vehicle with ID ${req.params.id} not found` });
    } else {
      res.send(vehicle);
    }
  } catch (err) {
    res.status(500).send({ "error": err.message });
  }
};

// PUT: Update a vehicle by ID
exports.vehicle_update_put = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) {
      return res.status(404).send({ error: `Vehicle with ID ${req.params.id} not found` });
    }
    res.send(vehicle);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// DELETE: Delete a vehicle by ID
exports.vehicle_delete = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).send({ error: `Vehicle with ID ${req.params.id} not found` });
    }
    res.send({ message: `Vehicle with ID ${req.params.id} deleted successfully` });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Web page for creating a vehicle
exports.vehicle_create_Page = function (req, res) {
  console.log("Rendering vehicle creation page");
  try {
      res.render('vehiclescreate', { title: 'Create a Vehicle' });
  } catch (err) {
      res.status(500).send(`{'error': '${err}'}`);
  }
};


// Web page for updating a vehicle
exports.vehicle_update_Page = async (req, res) => {
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


// Web page for deleting a vehicle
exports.vehicle_delete_Page = async (req, res) => {
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

// Web page for all vehicles
exports.vehicle_view_all_Page = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.render('vehicles', { title: 'Vehicles', results: vehicles });
  } catch (err) {
    res.status(500).send({ "error": err.message });
  }
};

// Web page for a single vehicle
exports.vehicle_view_one_Page = async (req, res) => {
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
