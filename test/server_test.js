var assert = require('assert'),
		routes = require('../lib/routes.js'),
		sinon = require('sinon'),
		server = require('../lib/server.js'),
		winston = require('winston');

describe('server', function() {
	before(function() {
		sinon.stub(routes, 'bind');
		sinon.stub(winston, 'info');
		server._port = 42;
		globals.app = sinon.stub();
		globals.app.set = sinon.stub();
		globals.app.use = sinon.stub();
		globals.app.listen = sinon.stub();
		globals.app.listen.yields();
	});
	after(function() {
		routes.bind.restore();
		winston.info.restore();
		globals.app = undefined;
	});
	describe('start', function() {
		before(function() {
			server.start();
		});
		it('should bind routes', function() {
			assert(routes.bind.calledOnce);
		});
		it('should listen on correct port', function() {
			assert(globals.app.listen.calledOnce);
			assert.equal(globals.app.listen.firstCall.args[0], 42);
		});
		it('should log started', function() {
			assert(winston.info.calledOnce);
		});
	});
});