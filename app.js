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
var vehiclesRouter = require('./routes/vehicles');

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
// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // Pug templating engine

// Middleware setup
app.use(logger('dev')); // Logger middleware
app.use(express.json()); // JSON parser middleware
app.use(express.urlencoded({ extended: true })); // URL-encoded body parser middleware
app.use(cookieParser()); // Cookie parser middleware
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from "public" directory
// Use the routes
app.use('/resource/vehicles',vehiclesRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('grid',gridRouter);
app.use('/randomitem',pickRouter);
app.use('/resource', resourceRouter); // Resources route
app.use('/vehicles', vehiclesRouter);

app.use(passport.initialize());
app.use(passport.session());
// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
app.use(express.static('public'));

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
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
