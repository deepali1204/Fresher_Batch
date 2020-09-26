const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const swaggerjsdoc=require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express')

const swaggeroptions={
  swaggerDefinition:{
    info:{
      title:"Flight Details",
      description:"Admin Functionalities related to flight",
      contact:{
        name:"Flight Reservation System",
      },
      servers:["http://localhost:6000"]
    }
  },
  apis:["./routes/flight.routes.js"],
}

const swaggerDocs=swaggerjsdoc(swaggeroptions);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs));

var corsOptions = {
  origin: "http://localhost:9000"
};



// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));
const db = require("./models");
db.mongoose
  .connect("mongodb+srv://DJ_21:Deepalijain12%23@cluster0.edyt0.mongodb.net/Flight_Reservation?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });









// simple route
app.get("/", (req, res) => {
  res.json({ message: "Flights." });
});

require("./routes/flight.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});