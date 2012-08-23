/*jshint es5:true*/

var express = require('express'),
		routes = require('./routes.js'),
		winston = require('winston');

globals = { };
globals.app = express();

var server = { };

server._port = process.env.PORT || 5000;

server.start = function() {
	server._configure();
	routes.bind();
	server._listen();
};

server._configure = function() {
	var root = __dirname + '/../';
	globals.app.set('views', root + 'views');
	globals.app.use(express.static(root + 'static'));
	globals.app.set('view engine', 'ejs');
};

server._listen = function() {
	globals.app.listen(server._port, server._started);
};

server._started = function() {
	winston.info("server started", server._port);
};

module.exports = server;