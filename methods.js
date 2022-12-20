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

app.get('/users', (req, res) => {
  let {name, age} = req.query;
  let filteredData = users.filter(userObj => {
    return (userObj.name == name && userObj.age == age)
  })
  res.json(filteredData);
})


app.post('/user',(req, res) => {
  console.log(req.body);
  user = req.body;
  res.json({   // ham json format me bhejte he jisse pretty me dekh sake
    "message": "User is Received",
    "user": req.body
  })
})

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

app.delete('/user',(req, res) => {
  console.log(req.body);
  user = {};
  res.json({   
    "message": "User is Deleted",
    "user": user
  }) })
app.listen(5000);