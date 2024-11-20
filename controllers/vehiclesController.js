const Vehicle = require('../models/vehicles');
const { deleteVehicle } = require('../controllers/vehiclesController'); // Correct path and controller name

module.exports = { deleteVehicle }; // Ensure this line is present
