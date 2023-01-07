var jwt = require("jsonwebtoken");
const {JWT_KEY} = require('./secrets')

module.exports.protectRoute = function (req, res, next) {
  if (req.cookies.login) {
    let token = req.cookies.login; // we are taking token from user browser
    let isVerified = jwt.verify(token, JWT_KEY);
    // console.log('isVerified : ', isVerified);
    if (isVerified) {
      next();
    }
    
  }
  else {
    res.json({
      msg: "Operation not allowed"
    })
  }
}