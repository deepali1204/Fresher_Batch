//this mongoose model represents the flight collection in th mongodb db 
module.exports = mongoose => {
    const Flight = mongoose.model(
      "flights",
      mongoose.Schema(
        {
      flight_name:{type:String,required:true},
      from: {type:String,required:true},
      to: {type:String,required:true},
      date:{type:Date,required:true},
      departuretime: {type:String,required:true},
      arrivaltime:{type:String,required:true},
      fare:{type:Number,required:true}
        }
        
      )
    );
  
    return Flight;
  };