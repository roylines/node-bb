var assert = require('assert'),
		sinon = require('sinon'),
		store = require('../lib/store.js'),
		users = require('../lib/users.js');

describe('users', function() {
  describe('validate', function() {
    describe('username', function() {
      before(function() {
        sinon.stub(users.find, 'username');
      });
      after(function() {
        users.find.username.restore();
      });
      it('should return error if username is too short', function(done) {
        users.validate.username('12345', function(e) {
          assert.notEqual(e, null);
          done();
        });
      });
      it('should return error if users search fails', function(done) {
        users.find.username.yields('ERROR');
        users.validate.username('123456', function(e) {
          assert.equal(e, 'ERROR');
          done();
        });
      });
      it('should return error if users search finds username', function(done) {
        users.find.username.yields(null, { });
        users.validate.username('123456', function(e) {
          assert.equal(e, 'This username is already being used!');
          done();
        });
      });
      it('should return ok if users search fails to find username', function(done) {
        users.find.username.yields(null, null);
        users.validate.username('123456', done);
      });
    });
    describe('email', function() {
      it('should return error if emailname is too short', function(done) {
        users.validate.email('12345', function(e) {
          assert.notEqual(e, null);
          done();
        });
      });
      it('should return ok if email valid', function(done) {
        users.validate.email('will@goldston.com', done);
      });
    });
  });
  describe('with stubbed store', function() {
    before(function() {
      sinon.stub(store, 'getCollection');
    });
    after(function() {
      store.getCollection.restore();
    });
    describe('collection', function() {
      var collection = null;
      beforeEach(function() {
        store.getCollection.reset();
        collection = sinon.stub();
        store.getCollection.yields(null, collection);
      });
      it('should not error', function(done) {
        users.collection(done);
      });
      it('should call getCollection once', function(done) {
        users.collection(function() {
          assert.equal(store.getCollection.calledOnce, true);
          done();
        });
      });
      it('should call getCollection with correct arguments', function(done) {
        users.collection(function() {
          assert.equal(store.getCollection.args[0][0], 'users');
          done();
        });
      });
      it('should return error if getCollection fails', function(done) {
        store.getCollection.yields('ERROR');
        users.collection(function(e) {
          assert.equal(e, 'ERROR');
          done();
        });
      });
    });
    describe('find.username', function() {
      var collection = null;
      beforeEach(function() {
        store.getCollection.reset();
        collection = sinon.stub();
        collection.findOne = sinon.stub();
        collection.findOne.yields(null, 'USER');
        store.getCollection.yields(null, collection);
      });
      it('should not error', function(done) {
        users.find.username('username', done);
      });
      it('should call getCollection once', function(done) {
        users.find.username('username', function() {
          assert.equal(store.getCollection.calledOnce, true);
          done();
        });
      });
      it('should call getCollection with correct arguments', function(done) {
        users.find.username('username', function() {
          assert.equal(store.getCollection.args[0][0], 'users');
          done();
        });
      });
      it('should call findOne once', function(done) {
        users.find.username('username', function() {
          assert.equal(collection.findOne.calledOnce, true);
          done();
        });
      });
      it('should call findOne with correct arguments', function(done) {
        users.find.username('username', function() {
          assert.deepEqual(collection.findOne.args[0][0], { _id: 'username' });
          done();
        });
      });
      it('should call done returning found user', function(done) {
        users.find.username('username', function(e, user) {
          assert.equal(user, 'USER');
          done();
        });
      });
      it('should return error if getCollection fails', function(done) {
        store.getCollection.yields('ERROR');
        users.find.username('username', function(e) {
          assert.equal(e, 'ERROR');
          done();
        });
      });
      it('should return error if findOne fails', function(done) {
        collection.findOne.yields('ERROR');
        users.find.username('username', function(e) {
          assert.equal(e, 'ERROR');
          done();
        });
      });
    });
  });
});