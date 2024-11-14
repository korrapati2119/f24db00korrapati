const mongoose = require("mongoose")
const vehicleSchema = mongoose.Schema({
costume_type: String,
size: String,
cost: Number
})
module.exports = mongoose.model("vehicle", 
vehicleSchema)