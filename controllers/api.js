exports.api = function (req, res) {
  res.write('API for Vehicle Management\n');
  res.write('GET /resource/vehicles - List all vehicles\n');
  res.write('POST /resource/vehicles - Create a new vehicle\n');
  res.write('GET /resource/vehicles/:id - Get a vehicle by ID\n');
  res.write('PUT /resource/vehicles/:id - Update a vehicle by ID\n');
  res.write('DELETE /resource/vehicles/:id - Delete a vehicle by ID\n');
  res.send();
};
