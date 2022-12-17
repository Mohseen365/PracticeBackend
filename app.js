const express = require("express"); //baar baar start krne ke liye command daalne ki jrurat nhi he apne aap save ho jata he unlike in node
const app = express();

app.get("/", function (req, res) {
  res.send("<h1> Hello World </h1>"); //header status code sab yhi set kr deta he
});

app.get("/about", function (req, res) {
  res.sendFile("./views/about.html", //relative path from opened folder
  {root: __dirname} // base path of opened folder
  )
});

// app.get("/about", function (req, res) {
//   res.sendFile("D:\\Project\\Backend\\views\\about.html") //full path dekar bhi kar sakte he but \\ use krna hoga
// });


// app.get("/aboutus", function (req, res) {
//   res.redirect('/about');
// })
app.get('/aboutus', (req, res) => {
  res.redirect('/about');
})

app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", {root: __dirname});
})

app.listen(3000, () => {
  console.log("server is listening on port 3000");
})