// controllers/vehiclesController.js
const Vehicle = require('../models/vehicles');  // Make sure this path is correct

// Delete a vehicle by ID
const deleteVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);

    if (!deletedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json({ message: 'Vehicle deleted successfully', deletedVehicle });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err });
  }
};

module.exports = { deleteVehicle };
