const db = require("../models");
const Flight = db.flight;

// Create and Save a new Flight
exports.create = (req, res) => {
    const flights = new Flight({
      flight_name:req.body.flight_name,
      from: req.body.from,
      to: req.body.to,
     date: new Date(req.body.date),
     departuretime: req.body.departuretime,
     arrivaltime:req.body.arrivaltime,
     fare:req.body.fare
    });
    
// Save flight in the database
    flights
      .save(flights)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Flight."
        });
      });
  };
  
//to retreive flight with with flight_name
  exports.findAll = (req, res) => {
    const flight_name = req.query.flight_name;
    var condition = flight_name ? { flight_name: { $regex: new RegExp(flight_name), $options: "i" } } : {};
  
    Flight.find(condition)
      .then(data => {
        if(!data)
        res.status(404).send({message:"Not Found"});
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Flights."
        });
      });
  };


// Retrieve single flight from the database.
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Flight.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Flight with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving flight with id=" + id });
      });
  };


// Find a single flight with an id
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Flight.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update flight with id=${id}. Maybe flight was not found!`
          });
        } else res.send({ message: "flight was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating flight with id=" + id
        });
      });
  };



// Delete a flight with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Flight.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete flight with id=${id}. Maybe flight was not found!`
          });
        } else {
          res.send({
            message: "flight was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete flight with id=" + id
        });
      });
  };

// Delete all flights from the database.
exports.deleteAll = (req, res) => {
    Flight.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Flights were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all flights."
        });
      });
  };

