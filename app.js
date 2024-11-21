require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Import route files
const vehicleRoutes = require('./routes/vehicles');  // Vehicle routes
const resourceRoutes = require('./routes/resource'); // Resource routes

// Connect to MongoDB using the connection string from .env
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log("Connection to DB succeeded");
});

const app = express();

// Import other routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

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
app.use('/', indexRouter); // Index route
app.use('/users', usersRouter); // Users route
app.use('/vehicles', vehicleRoutes);  // Vehicle routes
app.use('/resources', resourceRoutes); // Resources route

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));  // Forward 404 error to error handler
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals for error message and stack trace
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};  // Detailed error in dev environment
  res.status(err.status || 500);  // Default to 500 if no status
  res.render('error');  // Render error view
});

// Set the port and start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
