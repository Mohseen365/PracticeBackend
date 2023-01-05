const userModel = require('../models/userModel')

module.exports.getUser = async function (req, res, next) {
  // let {name, age} = req.query;
  // let filteredData = users.filter(userObj => {
  //   return (userObj.name == name && userObj.age == age)
  // })
  let allUsers = await userModel.findOne({name:"Suresh"})
  
  res.json({ msg: "users retrieved", allUsers });
  next();
}


module.exports.postUser = function (req, res) {
  console.log(req.body);
  user = req.body;
  res.json({   // ham json format me bhejte he jisse pretty me dekh sake
    "message": "User is Received",
    "user": req.body
  })
}


module.exports.patchUser = async function (req, res) {
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


module.exports.deleteUser = async function (req, res) {
  console.log(req.body);
  // user = {};
  let doc = await userModel.findOneAndRemove({email: "Rajesh@gmail.com"})
  res.json({   
    "message": "User is Deleted",
    // "user": user
  }) }


module.exports.setCookies = function (req, res) {
  res.cookie('isLoggedIn', true, {maxAge: 10000, secure:true}); //maxage is in milliseconds, secure means https
  res.cookie('password', 1234567890, {secure:true});
  res.send('cookies has been send');
}

module.exports.getCookies = function (req, res) {
  let cookies = req.cookies;
  console.log('OUTPUT : ', req.cookies.password);
  console.log('req.cookies : ', cookies);
  console.log('req.cookie : ', req.cookie);

  res.send('Cookies received');
}