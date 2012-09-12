var assert = require('assert'),
	sinon = require('sinon'),
	api = require('../lib/api.js'),
  users = require('../lib/users.js');

describe('api', function() {
  describe('api.users._validateUsername', function() {
    before(function() {
      sinon.stub(users, 'byUsername');
    });
    after(function() {
      users.byUsername.restore();
    });
    it('should return error if username is too short', function(done) {
      api.users._validateUsername('12345', function(e) {
        assert.notEqual(e, null);
        done();
      });
    });
    it('should return error if users search fails', function(done) {
      users.byUsername.yields('ERROR');
      api.users._validateUsername('123456', function(e) {
        assert.equal(e, 'ERROR');
        done();
      });
    });
    it('should return error if users search finds username', function(done) {
      users.byUsername.yields(null, { });
      api.users._validateUsername('123456', function(e) {
        assert.equal(e, 'This username is already being used!');
        done();
      });
    });
    it('should return ok if users search fails to find username', function(done) {
      users.byUsername.yields(null, null);
      api.users._validateUsername('123456', done);
    });
  });
  describe('api.users._validateEmail', function() {
    it('should return error if emailname is too short', function(done) {
      api.users._validateEmail('12345', function(e) {
        assert.notEqual(e, null);
        done();
      });
    });
    it('should return ok if email valid', function(done) {
      api.users._validateEmail('will@goldston.com', done);
    });
  });
});