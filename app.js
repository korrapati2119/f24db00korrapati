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

const vehicleRoutes = require('./routes/vehicles'); 

var app = express();

const Vehicle = require('./models/vehicles');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err)
      })
  })
)
// Import other routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
const Vehicles = require('./models/vehicles');

const resourceRouter = require('./routes/resource');
var vehiclesRouter = require('./routes/vehicles');

// The Account model
var Account =require('./models/account');
// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); 

// Middleware setup
app.use(logger('dev')); // Logger middleware
app.use(express.json()); // JSON parser middleware
app.use(express.urlencoded({ extended: false })); // URL-encoded body parser middleware
app.use(cookieParser()); // Cookie parser middleware
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));



// Use the routes
app.use('/vehicles',vehiclesRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid',gridRouter);
app.use('/randomitem',pickRouter);
app.use('/resource', resourceRouter); // Resources route
app.use('/vehicles', vehicleRoutes);

// passport config
// Use the existing connection


passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

async function recreateDB() {
  await Vehicle.deleteMany(); // Delete all existing vehicle records

  // Sample vehicle data
  const vehicle1 = new Vehicle({ vehicle_name: "Sedan", price: 20000, functionality: "Transportation" });
  const vehicle2 = new Vehicle({ vehicle_name: "Sport Bike", price: 15000, functionality: "Recreational" });
  const vehicle3 = new Vehicle({ vehicle_name: "SUV", price: 25000, functionality: "Transportation" });

  // Save sample vehicles to the database
  await vehicle1.save();
  await vehicle2.save();
  await vehicle3.save();

  console.log("Database seeded successfully!");
}

// MongoDB connection
mongoose.connect(connectionString)
    .then(() => {
        const db = mongoose.connection;
        
        // Bind connection to error event
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once("open", function() {
            console.log("Connection to DB succeeded");
        });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

const reseed = true;
if (reseed) { recreateDB(); }

module.exports = app;
