//defining routes
module.exports = app => {
    const flight = require("../controllers/search.controller.js");
  
    var router = require("express").Router();
  
    
  
// Retrieve all Flights
    router.post("/", flight.findAll);
  
    
   app.use('/api/flight', router);
  };