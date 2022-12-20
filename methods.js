const express = require('express');
const app = express();
app.use(express.json());// isse use krna padta he post req ko chalane ke liye
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