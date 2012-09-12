var assert = require('assert'),
		sinon = require('sinon'),
		store = require('../lib/store.js'),
		users = require('../lib/users.js');

describe('users', function() {
  describe('with stubbed store', function() {
    before(function() {
      sinon.stub(store, 'getCollection');
    });
    after(function() {
      store.getCollection.restore();
    });
    describe('byUsername', function() {
      var collection = null;
      beforeEach(function() {
        store.getCollection.reset();
        collection = sinon.stub();
        collection.findOne = sinon.stub();
        collection.findOne.yields(null, 'USER');
        store.getCollection.yields(null, collection);
      });
      it('should not error', function(done) {
        users.byUsername('username', done);
      });
      it('should call getCollection once', function(done) {
        users.byUsername('username', function() {
          assert.equal(store.getCollection.calledOnce, true);
          done();
        });
      });
      it('should call getCollection with correct arguments', function(done) {
        users.byUsername('username', function() {
          assert.equal(store.getCollection.args[0][0], 'users');
          done();
        });
      });
      it('should call findOne once', function(done) {
        users.byUsername('username', function() {
          assert.equal(collection.findOne.calledOnce, true);
          done();
        });
      });
      it('should call findOne with correct arguments', function(done) {
        users.byUsername('username', function() {
          assert.deepEqual(collection.findOne.args[0][0], { _id: 'username' });
          done();
        });
      });
      it('should call done returning found user', function(done) {
        users.byUsername('username', function(e, user) {
          assert.equal(user, 'USER');
          done();
        });
      });
      it('should return error if getCollection fails', function(done) {
        store.getCollection.yields('ERROR');
        users.byUsername('username', function(e) {
          assert.equal(e, 'ERROR');
          done();
        });
      });
      it('should return error if findOne fails', function(done) {
        collection.findOne.yields('ERROR');
        users.byUsername('username', function(e) {
          assert.equal(e, 'ERROR');
          done();
        });
      });
    });
  });
});