var mongoose = require('mongoose');

var vehiclesSchema = new mongoose.Schema({
  vehicles_name: { type: String, required: true },
  price: { type: Number, required: true },
  functionality: { type: String, required: true }
});

module.exports = mongoose.model('Vehicles',vehiclesSchema);