module.exports = mongoose => {
    const Flight = mongoose.model(
      "flights",
      mongoose.Schema(
        {
      flight_name:String,
      from: String,
      to: String,
      date:  Date,
      departuretime: String,
      arrivaltime:String,
      fare:Number
        },
        { timestamps: true }
      )
    );
  
    return Flight;
  };