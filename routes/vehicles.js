const express = require('express');
const router = express.Router();

const results = [
  { vehicles_name: 'Sedan', vehicle_type: 'Car', max_speed: 180 },
  { vehicles_name: 'Sport Bike', vehicle_type: 'Motorcycle', max_speed: 220},
  { vehicles_name: 'SUV', vehicle_type: 'Car', max_speed: 160}
];

// Route to render the Sculptures page
router.get('/', (req, res) => {
  res.render('Vehicles', { 
    title: 'Vehicles search results', 
    results: results  
  });
});
module.exports = router;