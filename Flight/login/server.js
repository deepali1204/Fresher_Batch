const express=require('express');
const bodyParser=require('body-parser');
const dbConfig=require('./config/db.config')
const cors=require('cors');
const db=require('./models');

const Role = db.role;

 const app=express();

 var corSOptions={
    origin: "http://localhost:9000"
 }

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:true}));

 app.use(cors(corSOptions));


db.mongoose.connect("mongodb+srv://DJ_21:Deepalijain12%23@cluster0.edyt0.mongodb.net/Flight_Reservation?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
})
.catch(err => {
    console.error("Connection error", err);
    process.exit();
})




function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

     
        new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
    
app.get('/',(req,res) =>{
     res.json({
         message: "Welcome to my application"
     })
 })
 PORT=process.env.PORT || 8000;
 app.listen(PORT,()=>{
     console.log("Your application is running on port :"  +PORT)
 })

 require('./routes/auth.routes')(app);
 require('./routes/user.routes')(app);
