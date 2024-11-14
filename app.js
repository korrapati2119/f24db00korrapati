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
db.once('open', function () {
  console.log("Connection to DB succeeded");
});

var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');  // <-- Add this line
var resourceRouter = require('./routes/resource');
var vehiclesRouter = require('./routes/vehicles');  

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);  // Using pickRouter now that it's defined
app.use('/resource', resourceRouter);
app.use('/vehicles', vehiclesRouter);

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
// Create new vehicles
const vehicles = [
  { vehicle_name: 'Sedan', price: 20000, functionality: 'Transportation' },
  { vehicle_name: 'Sport Bike', price: 15000, functionality: 'Recreational' },
  { vehicle_name: 'SUV', price: 35000, functionality: 'Transportation' }
];

module.exports = app;
