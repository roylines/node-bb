/*jshint es5:true*/

var express = require('express'),
		routes = require('./routes.js'),
    store = require('./store.js'),
		winston = require('winston');

var server = { };

server._app = express();
server._port = process.env.PORT || 5000;

server.start = function(done) {
  store.open(function(e) {
    if(e) {
      winston.error(e);
      return done(e);
    }

    routes.configure(server._app);
    server._listen();
    done();
  });
};

server._listen = function() {
	server._app.listen(server._port, server._started);
};

server._started = function() {
	winston.info("server started", server._port);
};

module.exports = server;