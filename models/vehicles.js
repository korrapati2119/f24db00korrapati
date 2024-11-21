const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicle_name: { type: String, required: true },
  price: { type: Number, required: true },
  functionality: { type: String, required: true }
});

module.exports = mongoose.model('Vehicles', vehicleSchema);
