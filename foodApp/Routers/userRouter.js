const express = require('express');
const userModel = require('../models/userModel')

// We will use mounting which will me created for each route (mini app)
const userRouter = express.Router(); //we use this so that we can use function for get,post,etc

userRouter    // It will execute the any type of request it wil encounter (get, post, etc)
  .route('/')
  .get(protectRoute, getUser) // From these 3 fn only 1 can send response
  .post(postUser)
  .patch(patchUser)
  .delete(deleteUser)

userRouter
  .route('/setcookies')
  .get(setCookies);

userRouter
  .route('/getcookies')
  .get(getCookies)


function protectRoute(req, res, next) {
  if (req.cookies.isLoggedIn) {
    next();
  }
  else {
    res.json({
      msg: "Operation not allowed"
    })
  }
}

async function getUser(req, res, next) {
  // let {name, age} = req.query;
  // let filteredData = users.filter(userObj => {
  //   return (userObj.name == name && userObj.age == age)
  // })
  let allUsers = await userModel.findOne({name:"Suresh"})
  
  res.json({ msg: "users retrieved", allUsers });
  next();
}



function postUser (req, res) {
  console.log(req.body);
  user = req.body;
  res.json({   // ham json format me bhejte he jisse pretty me dekh sake
    "message": "User is Received",
    "user": req.body
  })
}


async function patchUser (req, res) {
  const dataToBeUpdated = req.body;
  console.log(req.body);
  // for(key in dataToBeUploaded) {
  //   user[key] = dataToBeUploaded[key];
  // }
  let doc = await userModel.findOneAndUpdate({email: "Rajesh@gmail.com"}, dataToBeUpdated);
  res.json({
    "message" : "Data updated",
    // "user": user
  })
}


async function deleteUser (req, res) {
  console.log(req.body);
  // user = {};
  let doc = await userModel.findOneAndRemove({email: "Rajesh@gmail.com"})
  res.json({   
    "message": "User is Deleted",
    // "user": user
  }) }


function setCookies (req, res) {
  res.cookie('isLoggedIn', true, {maxAge: 10000, secure:true}); //maxage is in milliseconds, secure means https
  res.cookie('password', 1234567890, {secure:true});
  res.send('cookies has been send');
}

function getCookies (req, res) {
  let cookies = req.cookies;
  console.log('OUTPUT : ', req.cookies.password);
  console.log('req.cookies : ', cookies);
  console.log('req.cookie : ', req.cookie);

  res.send('Cookies received');
}

module.exports = userRouter;