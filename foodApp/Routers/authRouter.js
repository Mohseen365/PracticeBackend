const express = require('express');
const userModel = require('../models/userModel')

var jwt = require("jsonwebtoken");
const {JWT_KEY}=require('../secrets'); //anything randomly

const authRouter = express.Router();

authRouter
  .route('/signup')
  .get(getSignup)
  .post(postSignup)

authRouter
  .route('/login')
  .post(loginUser)

function getSignup(req, res) {
  res.sendFile("/public/index.html", {root: __dirname});
  console.log('get axios');
}

async function postSignup (req, res) {
  // let {email, name, password} = req.body;
  try {
    console.log(req.body); //backend log will show in terminal
  let data = req.body;
  console.log('in signup start');
  //pre hook will be called
  let user = await userModel.create(data);
  // post hook will be called
  res.json({
    message: "User Signed Up",
    user
    
  })
  console.log('in signup end');
  } catch (err) {
    res.json({
      err:err.message
    })
  }
}

async function loginUser (req, res) {
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

module.exports = authRouter;