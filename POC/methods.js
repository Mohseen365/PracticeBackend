const express = require('express');
const app = express();
app.use(express.json());// isse use krna padta he post req ko chalane ke liye
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
app.use('/user',userRouter);//no need to add localhost i.e. base url

userRouter    // It will execute the any type of request it wil encounter (get, post, etc)
  .route('/')
  .get(getUser)
  .post(postUser)
  .patch(patchUser)
  .delete(deleteUser)



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

function getUser(req, res) {
  let {name, age} = req.query;
  let filteredData = users.filter(userObj => {
    return (userObj.name == name && userObj.age == age)
  })
  res.json(filteredData);
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