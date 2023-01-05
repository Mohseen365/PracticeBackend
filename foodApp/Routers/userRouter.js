const express = require('express');

const {protectRoute} = require('../helper');
const {getUser, postUser, patchUser, deleteUser, setCookies, getCookies} = require('../controller/userController');

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






module.exports = userRouter;