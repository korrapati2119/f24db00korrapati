// models/vehicles.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  vehicle_name: { type: String, required: true },
  price: { type: Number, required: true },
  functionality: { type: String, required: true }
});
// Create new vehicles
const vehicles = [
  { vehicle_name: 'Sedan', price: 20000, functionality: 'Transportation' },
  { vehicle_name: 'Sport Bike', price: 15000, functionality: 'Recreational' },
  { vehicle_name: 'SUV', price: 35000, functionality: 'Transportation' }
];
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
