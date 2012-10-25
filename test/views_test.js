var assert = require('assert'),
    recaptcha = require('../lib/recaptcha.js'),
    sinon = require('sinon'),
    views = require('../lib/views.js');

describe('views', function() {
  var request = { };
  var response = { };

  beforeEach(function() {
    response.render = sinon.stub();
    request.body = 'THEBODY';
  });

  describe('home', function() {
    it('should not error', function() {
      views.home(request, response);
    });
    it('should call render once', function() {
      views.home(request, response);
      assert.equal(response.render.calledOnce, true);
    });
    it('should pass render the correct view', function() {
      views.home(request, response);
      assert.equal(response.render.args[0][0], 'home');
    });
    it('should pass render the correct meta', function() {
      views.home(request, response);
      var meta = response.render.args[0][1];

      assert.equal(meta.title, "Bendy:Boards");
      assert.equal(meta.description, "Measure, Reflect, Improve");
    });
  });

  describe('account', function() {
    it('should not error', function() {
      views.account(request, response);
    });
    it('should call render once', function() {
      views.account(request, response);
      assert.equal(response.render.calledOnce, true);
    });
    it('should pass render the correct view', function() {
      views.account(request, response);
      assert.equal(response.render.args[0][0], 'account');
    });
    it('should pass render the correct meta', function() {
      views.account(request, response);
      var meta = response.render.args[0][1];

      assert.equal(meta.title, "Bendy:Boards");
      assert.equal(meta.description, "Manage Your Account");
    });
  });

  describe('signup', function() {
    before(function() {
      sinon.stub(recaptcha, 'publicKey');
      recaptcha.publicKey.returns('PUBKEY');
      response.errors = 'ERRORS';
    });
    after(function() {
      recaptcha.publicKey.restore();
      response.errors = undefined;
    });
    it('should not error', function() {
      views.signup(request, response);
    });
    it('should call render once', function() {
      views.signup(request, response);
      assert.equal(response.render.calledOnce, true);
    });
    it('should pass render the correct view', function() {
      views.signup(request, response);
      assert.equal(response.render.args[0][0], 'signup');
    });
    it('should pass render the correct meta', function() {
      views.signup(request, response);
      var meta = response.render.args[0][1];

      assert.equal(meta.title, "Bendy:Boards");
      assert.equal(meta.description, "Create your personal account");
      assert.equal(meta.recaptcha, "PUBKEY");
      assert.equal(meta.errors, "ERRORS");
      assert.equal(meta.values, "THEBODY");
    });
  });
});