// models/vehicles.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehicleSchema = new Schema({
  vehicle_name: { type: String, required: true },
  price: { type: Number, required: true },
  functionality: { type: String, required: true }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);