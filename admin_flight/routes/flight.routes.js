module.exports = app => {
    const flight = require("../controller/flight.controller.js");
  
    var router = require("express").Router();
  
    /**
* @swagger
* /api/flight:
*   post:
*     tags:
*       — Flights
*     summary: This should create a new Flight.
*     description: This is where you can create a ne Flight.
*     consumes:
*       — application/json
*     responses: 
*       200:
*         description: Recieves back flight details with flight name.
*/
    // Create a new Tutorial
    router.post("/", flight.create);
      /**
* @swagger
* /api/flight:
*   get:
*     tags:
*       — Flights
*     summary: This should retieve all the Flights.
*     description: This is where you can retrieve all the Flights.
*     consumes:
*       — application/json
*     responses: 
*       200:
*         description: Recieves back flight details with flight name.
*/
     // Retrieve all Flight
     router.get("/", flight.findAll);
  
      /**
* @swagger
* /api/flight/5f4c055a2882572a04fa97e6:
*   get:
*     tags:
*       — Flights
*     summary: This should retrieve a Flight by ID.
*     description: This is where you can retrieve a Flight by ID.
*     consumes:
*       — application/json
*     responses: 
*       200:
*         description: Recieves back a flight details with flight name.
*/

    //Retrieve a single Tutorial with id
    router.get("/:id", flight.findOne);
  
       /**
* @swagger
* /api/flight/5f4c055a2882572a04fa97e6:
*   put:
*     tags:
*       — Flights
*     summary: This should update an existing Flight.
*     description: This is where you can update a Flight.
*     consumes:
*       — application/json
*     responses: 
*       200:
*         description: Recieves back an updated flight details with flight name.
*/
    // Update a Tutorial with id
    router.put("/:id", flight.update);
  
      /**
* @swagger
* /api/flight/5f4c055a2882572a04fa97e6:
*   delete:
*     tags:
*       — Flights
*     summary: This should delete a Flight by ID.
*     description: This is where you can delete a Flight by ID.
*     consumes:
*       — application/json
*     responses: 
*       200:
*         description: Deletes the flight details with flight name.
*/
    // Delete a Tutorial with id
    router.delete("/:id", flight.delete);
    /**
* @swagger
* /api/flight:
*   delete:
*     tags:
*       — Flights
*     summary: This should delete all the Flights.
*     description: This is where you can delete all the Flights.
*     consumes:
*       — application/json
*     responses: 
*       200:
*         description: Deletes all the flight details with flight name.
*/
    // Create a new Tutorial
    router.delete("/", flight.deleteAll);
  
    app.use('/api/flight', router);
  };