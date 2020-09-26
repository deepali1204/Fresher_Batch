module.exports = app => {
    const flight = require("../controllers/search.controller.js");
  
    var router = require("express").Router();
  
    
  
    // Retrieve all Tutorials
    router.post("/", flight.findAll);
  
    //Retrieve a single Tutorial with id
    //router.get("/:id", flight.findOne);
   app.use('/api/flight', router);
  };