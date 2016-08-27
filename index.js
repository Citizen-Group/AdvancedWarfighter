var express = require('express');
var app = express();

app.get('/', function (req, res){
res.send('Hello World!');
});

app.get('/dick', function (req, res){
res.send('For Harbre!');
});

app.listen(3000,function() {
console.log('example app listening on port 3000!');
});
