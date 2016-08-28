var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var app = express()

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
  // CORS for DEV
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  console.log(req.body); // populated!
  response.send(request.body);    // echo the result back
  next();
})

app.listen(3000,function() {
console.log('example app listening on port 3000!');
});
