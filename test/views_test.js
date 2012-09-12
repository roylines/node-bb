var assert = require('assert'),
    sinon = require('sinon'),
    views = require('../lib/views.js');

describe('views', function() {
  var request = { };
  var response = { };

  beforeEach(function() {
    response.render = sinon.stub();
  });

  describe('home', function() {
    it('should not error', function() {
      views.home(request, response);
    });
    it('should call render once', function() {
      views.home(null, response);
      assert.equal(response.render.calledOnce, true);
    });
    it('should pass render the correct view', function() {
      views.home(null, response);
      assert.equal(response.render.args[0][0], 'home');
    });
    it('should pass render the correct meta', function() {
      views.home(null, response);
      assert.deepEqual(response.render.args[0][1], {"title":"BendyBoards"});
    });
  });
});