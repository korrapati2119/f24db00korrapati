const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for Vehicle
const vehicleSchema = new mongoose.Schema({
    vehicle_name: {
        type: String,
        required: [true, 'Vehicle name is required'],
        minlength: [3, 'Vehicle name must be at least 3 characters long'],
        maxlength: [100, 'Vehicle name must be less than 100 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [1000, 'Price must be at least $1000'],
        max: [1000000, 'Price must be less than $1,000,000'],
    },
    functionality: {
        type: String,
        required: [true, 'Functionality is required'],
        enum: ['Transportation', 'Recreational', 'Commercial', 'Military'], // Example of an enum validator
    },
});

// Use mongoose.model to define the model
module.exports = mongoose.model('Vehicle', vehicleSchema);
