const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => { //it creates the server but response tab hi jayega jab http://localhost:3000/ se request aayegi
  console.log("request from browser to server");
  res.setHeader('Content-type','text/html');
  // res.write("<h1>hello world</h1>");
  // res.write("<h2>Bang bang</h>");
  // res.end("res end");
  let path = './views';
  switch (req.url) {
    case '/':
      path += '/index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += '/about.html';
      res.statusCode = 200;
      break;
    case '/aboutUs':
      res.statusCode = 301;
      res.setHeader('Location','/about');
      res.end();//agar ye nhi krte to loop hota rehta baar baar reload hota
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }
  fs.readFile(path, (err, file) => {
    if (err) {
      console.log(err);
    } else {
      res.write(file);
      res.end();
    }
  })
})
server.listen(3000,'localhost', ()=>{ //browser se request lega
  console.log("server is listening on port 3000");

})


