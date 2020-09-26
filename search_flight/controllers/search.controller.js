const db = require("../models");
const Flight = db.flight;

exports.findAll = (req, res) => {
    const from = req.body.from;
    const to=req.body.to;
    const date=new Date(req.body.date)
    
  
    Flight.find({from:from,to:to,date:date})
    .then(data => {
      console.log("inside");
      res.send(data);
      // res.status().json({
      //   from: data.from,
      //   to: data.to
      // })
      
    })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving flights."
        });
      });
  };