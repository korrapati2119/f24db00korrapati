require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log("Connection to DB succeeded");
});
var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const resourceRouter = require('./routes/resource');
var vehicleRouter = require('./routes/vehicle');  

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/vehicle', vehicleRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);
app.use('/resource', resourceRouter);  // Route for all resource-related requests

//Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Show detailed error in dev environment
  res.status(err.status || 500);
  res.render('error'); // Render error page
});

// Static Vehicle Route Example
app.get('/vehicle', (req, res) => {
  const results = [
    { vehicle_name: 'Sedan', vehicle_type: 'Car', max_speed: 180 },
    { vehicle_name: 'Sport Bike', vehicle_type: 'Motorcycle', max_speed: 220},
    { vehicle_name: 'SUV', vehicle_type: 'Car', max_speed: 160}
  ];
  res.render('vehicle', { results }); // Pass results to Pug
});
// Vehicles Route - Fetch from Database
app.get('/resource/vehicle', async (req, res) => {
  try {
    // Fetch all vehicles from the database
    const vehicle = await Vehicle.find();
    res.json(vehicle); // Send vehicles as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch vehicles" });
  }
});

module.exports = app;