var mongoose = require("mongoose");

var vehicleSchema = new mongoose.Schema({
  vehicle_name: { type: String, required: true },
  price: { type: Number, required: true },
  functionality: { type: String, required: true }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);