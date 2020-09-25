const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const{OAuth2Client}=require('google-auth-library')
var jwt = require("jsonwebtoken");
//to hash the password
var bcrypt = require("bcryptjs");


const client=new OAuth2Client("985968489392-hmfiq63dov2a84ot61e9sjmq8rt54cm1.apps.googleusercontent.com")

//function for signup
exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    lastname:req.body.lastname,
    gender:req.body.gender
  });

  //saving in the db
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    //checking roles and saving in db
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};
//function for login
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        gender:user.gender,
        lastname:user.lastname,
        roles: authorities,
        accessToken: token
      });
    });
};




exports.googlelogin=(req,res) =>{
  const {tokenId}=req.body;
  client.verifyIdToken({idToken:tokenId,audience:"985968489392-hmfiq63dov2a84ot61e9sjmq8rt54cm1.apps.googleusercontent.com"})
  .then(response =>{
    const{email_verified,name,email}= response.payload;
    //console.log(response.payload);
    
  })
  console.log();
}