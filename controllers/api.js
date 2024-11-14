// API for our resource
exports.api = function(req, res) {
    res.status(200).json({
      resources: [
        { resource: 'vehicles', verbs: ['GET', 'POST', 'PUT', 'DELETE'] }
      ]
    });
  };