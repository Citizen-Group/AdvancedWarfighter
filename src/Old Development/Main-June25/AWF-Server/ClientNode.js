// Entry point for the AWF server. Node.js
// June 25th 2016

var http = require('http');

//make the request object
var request = http.request({
  'host': '192.168.2.61',
  'port': 8080,
  'path': '/',
  'method': 'GET'
});

//assign callbacks
request.on('response', function(response) {
   console.log('Response status code:'+response.statusCode);

   response.on('data', function(data) {
     console.log('Body: '+data);
   });
});

request.end();