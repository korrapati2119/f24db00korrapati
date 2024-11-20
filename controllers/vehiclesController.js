const Vehicle = require('../models/vehicles');
const { deleteVehicle } = require('../controllers/vehiclesController'); // Correct path and controller name

const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Vehicle ID is required.' });
    }

    const deletedVehicle = await Vehicle.findByIdAndDelete(id);

    if (!deletedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found.' });
    }

    return res.status(200).json({
      message: 'Vehicle deleted successfully.',
      deletedVehicle,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to delete vehicle.',
      details: error.message,
    });
  }
};

module.exports = { deleteVehicle }; // Ensure this line is present
