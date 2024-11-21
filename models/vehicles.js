// models/vehicles.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicle_name: String,
  price: Number,
  functionality: String
});

module.exports = mongoose.model("Vehicles", vehicleSchema);
