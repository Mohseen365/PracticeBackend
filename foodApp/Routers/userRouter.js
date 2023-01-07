const express = require('express');

const {protectRoute} = require('../helper');
const {getUser, getAllUser, updateUser, deleteUser} = require('../controller/userController');


const userRouter = express.Router();

//options for user
userRouter    
  .route('/:id')
  .patch(updateUser)
  .delete(deleteUser)

  //profile page
app.use(protectRoute);
userRouter
  .route('/userProfile')
  .get(getUser);

app.use(isAuthorised['admin'])
userRouter
  .route('')
  .get(getAllUser)






module.exports = userRouter;