var assert = require('assert'),
    sinon = require('sinon'),
    recaptcha = require('../lib/recaptcha.js');

describe('recaptcha', function() {
  describe('with fake environment', function() {
    var env = null;
    before(function() {
      env = process.env;
      process.env = { };
    });
    after(function() {
      process.env = env;
    });
    describe('#publicKey', function() {
      it('should return environment variable', function() {
        process.env.BB_RECAPTCHA_PUBLIC = 'PUBKEY';
        assert.equal(recaptcha.publicKey(), 'PUBKEY');
      });
    });
    describe('#privateKey', function() {
      it('should return environment variable', function() {
        process.env.BB_RECAPTCHA_PRIVATE = 'PRIVKEY';
        assert.equal(recaptcha.privateKey(), 'PRIVKEY');
      });
    });
  });
});