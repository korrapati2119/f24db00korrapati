// In routes/vehicles.js
var express = require('express');
var router = express.Router();

// POST route to create a new vehicle
router.post('/', vehicle_controllers.vehicle_create_post);

module.exports = router;