exports.api = (req, res) => {
  res.json({
    message: "Welcome to the Vehicles API",
    endpoints: {
      listAllVehicle: "/vehicle [GET]",
      createVehicle: "/vehicle [POST]",
      getVehicleById: "/vehicle/:id [GET]",
      updateVehicle: "/vehicle/:id [PUT]",
      deleteVehicle: "/vehicle/:id [DELETE]"
    }
  });
};
