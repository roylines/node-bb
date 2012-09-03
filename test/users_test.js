var assert = require('assert'),
		sinon = require('sinon'),
		store = require('../lib/store.js'),
		users = require('../lib/users.js');

// describe('users', function() {
// 	var user = { };

// 	before(function() {
// 		sinon.stub(store, 'create').yields();
// 		sinon.stub(store, 'update').yields();
// 		sinon.stub(store, 'remove').yields();
// 	});
// 	after(function() {
// 		store.create.restore();
// 		store.update.restore();
// 		store.remove.restore();
// 	});

// 	describe('create', function() {
// 		before(function(done) {
// 			store.create.reset();
// 			users.create(user, done);
// 		});
// 		it('should call store', function() {
// 			assert(store.create.calledOnce);
// 			assert(store.create.calledWith(user, 'users'));
// 			assert.equal(store.create.firstCall.args.length, 3);
// 		});
// 	});

// 	describe('update', function() {
// 		before(function(done) {
// 			store.update.reset();
// 			users.update(user, done);
// 		});
// 		it('should call store', function() {
// 			assert(store.update.calledOnce);
// 			assert(store.update.calledWith(user, 'users'));
// 			assert.equal(store.update.firstCall.args.length, 3);
// 		});
// 	});

// 	describe('remove', function() {
// 		before(function(done) {
// 			store.remove.reset();
// 			users.remove(user, done);
// 		});
// 		it('should call store', function() {
// 			assert(store.remove.calledOnce);
// 			assert(store.remove.calledWith(user, 'users'));
// 			assert.equal(store.remove.firstCall.args.length, 3);
// 		});
// 	});
// });