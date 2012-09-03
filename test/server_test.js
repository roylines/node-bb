var assert = require('assert'),
		routes = require('../lib/routes.js'),
		sinon = require('sinon'),
		server = require('../lib/server.js'),
		winston = require('winston');

describe('server', function() {
	before(function() {
		sinon.stub(routes, 'configure');
		sinon.stub(winston, 'info');
		server._port = 42;
		server._app = sinon.stub();
		server._app.set = sinon.stub();
		server._app.use = sinon.stub();
		server._app.listen = sinon.stub();
		server._app.listen.yields();
	});
	after(function() {
		routes.configure.restore();
		winston.info.restore();
		server._app = undefined;
	});
	describe('start', function() {
		before(function() {
			server.start();
		});
		it('should configure routes', function() {
			assert(routes.configure.calledOnce);
		});
		it('should listen on correct port', function() {
			assert(server._app.listen.calledOnce);
			assert.equal(server._app.listen.firstCall.args[0], 42);
		});
		it('should log started', function() {
			assert(winston.info.calledOnce);
		});
	});
});