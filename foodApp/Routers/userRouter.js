const express = require('express');
const userRouter = express.Router();

const {protectRoute, isAuthorised} = require('../helper');
const {getUser, getAllUser, updateUser, deleteUser} = require('../controller/userController');
const {signup, login} = require('../controller/authController')


userRouter
  .route('/signup')
  .get(signup)

userRouter
  .route('/login')
  .get(login)

  //profile page
userRouter.use(protectRoute);
userRouter
  .route('/userProfile')
  .get(getUser);

//options for user
userRouter    
  .route('/:id')
  .patch(updateUser)
  .delete(deleteUser)

  //admin specific function
userRouter.use(isAuthorised['admin'])
userRouter
  .route('')
  .get(getAllUser)






module.exports = userRouter;