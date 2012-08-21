var assert = require('assert'),
	sinon = require('sinon'),
	store = require('../lib/store.js');

describe('store', function() {
	describe('_open', function() {
		it('should not error', function(done) {
			store._open(done);
		});
	});
	describe('addUser', function(done) {
		var user = { _id: 'roy', name: 'roy'};
		it('...', function(done) {
			store.addUser(user, function(e, d) {
				console.log(d);
				done(e, d);
			});
		});
	});
});