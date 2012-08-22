var express = require('express'),
		routes = require('./routes.js'),
		winston = require('winston');

var server = { };

server._port = process.env.PORT || 5000;

server._app = express();

server.start = function() {
	routes.bind(server._app);
	server._app.listen(server._port, server._started);
};

server._started = function() {
	winston.info("server started", server._port);
};

module.exports = server;