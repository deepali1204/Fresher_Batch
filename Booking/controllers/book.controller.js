const Booking = require('../models/booking.model')

exports.book=(req,res,next)=>{
    const user = req.body.user;
    const flights = req.body.flights;
    const quantity = req.body.quantity;
    //const amount = quantity*flights.fare;

    const booking = new Booking({
        booking_id:`${flights.flight_name}${flights.date}`,
        flights:flights,
        user:user,
        quantity:quantity,
        //amount:amount
    })
    booking.save()
    .then(data => {
        console.log("inside");
        res.status(200).json({
            message:"Booking confirmed",
            
            booking:data
        });
       
    })
    .catch(err=>{
        console.log("inside error")
        res.status(500).json({
            error:err
        })
    })
}

exports.cancel=(req,res,next)=>{
    const id = req.params.id;
    Booking.findByIdAndDelete(id)
    .exec()
    .then(result=>{
        if (!result) {
            res.status(404).send({
              message: `Cannot delete Booking with id=${id}. Maybe Booking was not found!`
            });
        }
        console.log("Inside delete")
        res.status(200).json({
            message:"Booking cancelled"
        })
    })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
}

exports.search=(req,res,next)=>{
    const id = req.params.id;
    Booking.findById(id)
    .select("flights quantity amount")
    .exec()
    .then(result=>{
        console.log("Inside search")
        res.status(200).send(result)
    })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
}