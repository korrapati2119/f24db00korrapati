var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const gridRouter = require('./routes/grid');
const pickRouter = require('./routes/pick');
const Vehicle = require('./models/vehicles');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);

var resourceRouter = require('./routes/resource'); // Ensure this path is correct

app.use('/resource', resourceRouter);  // Route for all resource-related requests

// Static Vehicle Route Example
app.get('/vehicles', (req, res) => {
  const results = [
    { vehicles_name: 'Sedan', vehicle_type: 'Car', max_speed: 180 },
    { vehicles_name: 'Sport Bike', vehicle_type: 'Motorcycle', max_speed: 220},
    { vehicles_name: 'SUV', vehicle_type: 'Car', max_speed: 160}
  ];
  res.render('vehicles', { results }); // Pass results to Pug
});

// Resource Route
app.get('/resource', (req, res) => {
  res.send('Resource page');
});

// Vehicles Route - Fetch from Database
app.get('/resource/vehicles', async (req, res) => {
  try {
    // Fetch all vehicles from the database
    const vehicles = await Vehicle.find();
    res.json(vehicles); // Send vehicles as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch vehicles" });
  }
});

// General Error Handling Route (for unknown routes)
app.use(function(req, res, next) {
  next(createError(404)); // Trigger 404 error if route doesn't match
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Show detailed error in dev environment
  res.status(err.status || 500);
  res.render('error'); // Render error page
});

// MongoDB connection setup
require('dotenv').config();
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log("Connection to DB succeeded");
});

module.exports = app;