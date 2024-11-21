require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log("Connection to DB succeeded");
});

var app = express();

// Import other routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
const Vehicles = require('./models/vehicles');
const resourceRouter  = require('./routes/resource');
const vehicleRouter = require('./routes/vehicles');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // Pug templating engine

// Middleware setup
app.use(logger('dev')); // Logger middleware
app.use(express.json()); // JSON parser middleware
app.use(express.urlencoded({ extended: true })); // URL-encoded body parser middleware
app.use(cookieParser()); // Cookie parser middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from "public" directory

// Use the routes
app.use('/vehicles',vehicleRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('grid',gridRouter);
app.use('/vehicles', vehicleRouter);  // Vehicle routes
app.use('/resource', resourceRouter); // Resources route

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404);
  res.render('error', { message: 'Page Not Found', error: {} });
});


// Error handler
app.use((err, req, res, next) => {
  // Set locals for error message and stack trace
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};  // Detailed error in dev environment
  res.status(err.status || 500);  // Default to 500 if no status
  res.render('error');  // Render error view
});
async function recreateDB() {
  await Vehicle.deleteMany();

  const vehicle1 = new Vehicle({ vehicle_name: "Sedan", price: 20000, functionality: "Transportation" });
  const vehicle2 = new Vehicle({ vehicle_name: "Sport Bike", price: 15000, functionality: "Recreational" });
  const vehicle3 = new Vehicle({ vehicle_name: "SUV", price: 25000, functionality: "Transportation" });

  await vehicle1.save();
  await vehicle2.save();
  await vehicle3.save();
}

// Set the port and start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
