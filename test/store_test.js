var assert = require('assert'),
		sinon = require('sinon'),
		store = require('../lib/store.js');

describe('store', function() {
	describe('_open', function() {
		it('should not error', function(done) {
			store._open(done);
		});
	});
});