const express = require('express');
const userRouter = express.Router();

const {protectRoute, isAuthorised} = require('../helper');
const {getUser, allUser, updateUser, deleteUser} = require('../controller/userController');
const {signup, login} = require('../controller/authController')


userRouter
  .route('/signup')
  .post(signup)

userRouter
  .route('/login')
  .post(login)

//options for user
userRouter    
  .route('/:id')
  .patch(updateUser)
  .delete(deleteUser)

  //profile page
userRouter.use(protectRoute);
userRouter
  .route('/profile')
  .get(getUser);



  //admin specific function
userRouter.use(isAuthorised(['admin'])); //error aayi thi because isAut.. me () lagana bhul gya tha
userRouter
  .route('/')
  .get(allUser)



module.exports = userRouter;