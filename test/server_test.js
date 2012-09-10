var assert = require('assert'),
		routes = require('../lib/routes.js'),
		server = require('../lib/server.js'),
		sinon = require('sinon'),
		store = require('../lib/store.js'),
		winston = require('winston');

describe('server', function() {
	describe('for real', function() {
		describe('start', function() {
			before(function() {
				sinon.stub(winston, 'info');
			});
			after(function() {
				winston.info.restore();
				store.close();
			});
			it('should not throw', function(done) {
				this.timeout(20000);
				server.start(done);
			});
		});
	});
	describe('with mocks', function() {
		before(function() {
			sinon.stub(routes, 'configure');
			sinon.stub(winston, 'info');
			sinon.stub(store, 'open');
			server._port = 42;
			server._app = sinon.stub();
			server._app.set = sinon.stub();
			server._app.use = sinon.stub();
			server._app.listen = sinon.stub();
			server._app.listen.yields();
			store.open.yields();
		});
		after(function() {
			routes.configure.restore();
			winston.info.restore();
			store.open.restore();
			server._app = undefined;
		});
		describe('start', function() {
			before(function(done) {
				server.start(done);
			});
			it('should open store', function() {
				assert(store.open.calledOnce);
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
});