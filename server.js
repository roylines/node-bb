var express = require('express');

var port = process.env.PORT || 5000;
var app = express();

app.get('/', function(request, response) {
  response.send('Hello Again');
});

app.listen(port, function() {
  console.log("Listening on " + port);
});