const userModel = require('../models/userModel')
var jwt = require("jsonwebtoken");
const {JWT_KEY}=require('../secrets'); 

module.exports.signup = async function  (req, res) {
  // let {email, name, password} = req.body;
  try {
    console.log(req.body); //backend log will show in terminal
  let data = req.body;
  console.log('in signup start');
  //pre hook will be called
  let user = await userModel.create(data);
  // post hook will be called

  if (user) {
    res.json({
      message: "User Signed Up",
      user     
    });
  } else {
    res.json({
      msg: "user could not be signed up"
    });
  }
  
  } catch (err) {
    res.json({
      err:err.message
    })
  }
}

module.exports.login = async function (req, res) {
  try {
    let {email, password} = req.body;
    let user = await userModel.findOne({email: email});
    if (user) {
      //bcrypt - compare 
      if (password == user.password) {
        let uid = user["_id"]; //unique id used to make token
        let token = jwt.sign({payload: uid}, JWT_KEY); // we had made token and we will give it to users so that we can uniquely recognise them later
        res.cookie('login', token); // give token to user
        res.json({
          msg: "Successful login"
        })
      }
      else {
        res.json({
          msg: "Wrong Credentials"
        })
      }
    }
    else {
      res.json({
        msg: "User does not exist"
      })
    }
  } catch (error) {
    res.json({
      msg: error.message
    })
  }
}
