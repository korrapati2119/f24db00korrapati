const Vehicles = require('../models/vehicles');

// List all vehicles
exports.vehicle_list = async (req, res) => {
    try {
        const vehicles = await Vehicles.find(); // Fetch all vehicles
        res.render('vehicles', { title: 'Vehicles List', results: vehicles }); // Render vehicles page
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// View all vehicles (rendered page)
exports.vehicle_view_all_Page = async function(req, res) {
    try {
        const vehicles = await Vehicles.find();
        res.render('vehicles', { title: 'Vehicle List', vehicles });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Vehicle details page
exports.vehicle_view_one_Page = async function(req, res) {
    try {
        const vehicle = await Vehicles.findById(req.query.id);
        if (!vehicle) {
            return res.status(404).send({ error: "Vehicle not found" });
        }
        res.render('vehicleDetail', { title: 'Vehicle Details', vehicle });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Get details of a specific vehicle
exports.vehicle_detail = async function (req, res) {
    try {
        const result = await Vehicles.findById(req.params.id);
        if (!result) {
            res.status(404).send(`{"error": "Vehicle with ID ${req.params.id} not found"}`);
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).send(`{"error": "Error retrieving vehicle for ID ${req.params.id}: ${error.message}"}`);
    }
};

// Create a new vehicle
exports.vehicle_create_post = async function(req, res) {
    let vehicle = new Vehicles({
        vehicle_name: req.body.vehicle_name,
        price: req.body.price,
        functionality: req.body.functionality
    });

    try {
        const result = await vehicle.save(); // Use 'vehicle' to save
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Delete vehicle
exports.vehicle_delete = async function(req, res) {
    try {
        const vehicle = await Vehicles.findByIdAndDelete(req.params.id);
        if (!vehicle) {
            return res.status(404).send({ error: "Vehicle not found" });
        }
        res.status(200).send({ message: "Vehicle deleted successfully" });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Vehicle delete page (for confirmation)
exports.vehicle_delete_Page = async function(req, res) {
    try {
        const vehicle = await Vehicles.findById(req.query.id);
        if (!vehicle) {
            return res.status(404).send({ error: "Vehicle not found" });
        }
        res.render('vehicleDelete', { title: 'Delete Vehicle', vehicle });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Update vehicle
exports.vehicle_update_put = async function(req, res) {
    try {
        let vehicle = await Vehicles.findById(req.params.id);
        if (req.body.vehicle_name) vehicle.vehicle_name = req.body.vehicle_name;
        if (req.body.price) vehicle.price = req.body.price;
        if (req.body.functionality) vehicle.functionality = req.body.functionality;

        const updatedVehicle = await vehicle.save(); // Save the updated vehicle
        res.status(200).send(updatedVehicle);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Vehicle update page (for rendering form)
exports.vehicle_update_Page = async function(req, res) {
    try {
        const vehicle = await Vehicles.findById(req.query.id);
        if (!vehicle) {
            return res.status(404).send({ error: "Vehicle not found" });
        }
        res.render('vehicleUpdate', { title: 'Update Vehicle', vehicle });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.vehicle_update_Page = async function (req, res) {
    try {
        const siteId = req.query.id;
        const vehicle = await Vehicle.findById(siteId);
        if (!vehicle) {
            return res.status(404).send({ error: "Vehicle not found" });
        }
        res.render('vehiclesupdate', {
            title: 'Update Vehicle',
            toShow: vehicles // Pass the site data to the Pug template
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
  };
  

// Vehicle create page (for rendering form)
exports.vehicle_create_Page = function(req, res) {
    res.render('vehicleCreate', { title: 'Create Vehicle' });
};
