const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db_link = require('./secrets');


app.use(express.json());// ye json ko js object me convert krta he, isse use krna padta he put aur post req (f/d se server pr data aa rha he)ko chalane ke liye
user = {};
users = [
  {
    id: 1,
    name: "Mohseen",
    age: 24
  },
  {
    id: 2,
    name: "Ansari",
    age: 25
  },
  {
    id: 1,
    name: "Ani",
    age: 17
  }
];

// We will use mounting which will me created for each route (mini app)
const userRouter = express.Router(); //we use this so that we can use function for get,post,etc
const authRouter = express.Router();

app.use('/auth',authRouter);
app.use('/user',userRouter);//no need to add localhost i.e. base url

userRouter    // It will execute the any type of request it wil encounter (get, post, etc)
  .route('/')
  .get(middleware1, getUser, middleware2) // From these 3 fn only 1 can send response
  .post(postUser)
  .patch(patchUser)
  .delete(deleteUser)

authRouter
  .route('/signup')
  .get(getSignup)
  .post(postSignup)

app.get('/user', (req, res) => {
  res.send(user);
})

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const filteredData = users.filter(userObj => {
    return (userObj.id == id)
  })
  res.json(filteredData);
})

// This will not work we have to make query
// app.get('/users/:name', (req, res) => {
//   const name = req.params.name;
//   const filteredData = users.filter(userObj => {
//     return (userObj.name == name)
//   })
//   res.json(filteredData);
// })


//----------------------

// app.get('/users', (req, res) => {
//   let {name, age} = req.query;
//   let filteredData = users.filter(userObj => {
//     return (userObj.name == name && userObj.age == age)
//   })
//   res.json(filteredData);
// })
function middleware1(req, res, next) {
  console.log("1 is called");
  next();
}

function getUser(req, res, next) {
  let {name, age} = req.query;
  let filteredData = users.filter(userObj => {
    return (userObj.name == name && userObj.age == age)
  })
  res.json(filteredData);
  next();
}

function middleware2(req, res) {
  console.log("2 is called");
  
}

function getSignup(req, res) {
  res.sendFile("/public/index.html", {root: __dirname});
  console.log('get axios');
}
//-------------------------

// app.post('/user',(req, res) => {
//   console.log(req.body);
//   user = req.body;
//   res.json({   // ham json format me bhejte he jisse pretty me dekh sake
//     "message": "User is Received",
//     "user": req.body
//   })
// })

function postUser (req, res) {
  console.log(req.body);
  user = req.body;
  res.json({   // ham json format me bhejte he jisse pretty me dekh sake
    "message": "User is Received",
    "user": req.body
  })
}

function postSignup (req, res) {
  let {email, name, password} = req.body;
  console.log(req.body); //backend log will show in terminal
  res.json({
    message: "Data is received in backend",
    email,
    name,
    password
    
  })
}
//-------------------------

app.patch('/user', (req, res) => {
  const dataToBeUploaded = req.body;
  for(key in dataToBeUploaded) {
    user[key] = dataToBeUploaded[key];
  }
  res.json({
    "message" : "Data updated",
    "user": user
  })
})

function patchUser (req, res) {
  const dataToBeUploaded = req.body;
  for(key in dataToBeUploaded) {
    user[key] = dataToBeUploaded[key];
  }
  res.json({
    "message" : "Data updated",
    "user": user
  })
}

//-------------------------
app.delete('/user',(req, res) => {
  console.log(req.body);
  user = {};
  res.json({   
    "message": "User is Deleted",
    "user": user
  }) })

function deleteUser (req, res) {
  console.log(req.body);
  user = {};
  res.json({   
    "message": "User is Deleted",
    "user": user
  }) }


app.listen(5000);


mongoose.connect(db_link)
    .then(function (db) {
        console.log("db connected");
        // console.log(db);
    })
    .catch(function (err) {
        console.log(err);
    });