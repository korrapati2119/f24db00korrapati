const mongoose = require('mongoose');

// Define the vehicle schema
const vehicleSchema = new mongoose.Schema({
  vehicle_name: { type: String, required: true },
  price: { type: Number, required: true },
  functionality: { type: String, required: true },
});

// Create the vehicle model based on the schema
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// Export the vehicle model
module.exports = Vehicle;
