var store = require('./store.js'),
    users = require('./users.js'),
    views = require('./views.js');

var api = { };

api.pivotal = { };

api.pivotal.projects = function(request, response) {
	response.send(404);
};

api.users = { };

api.users._validateUsername = function(username, done) {
  if(username.length < 6) {
    return done('This username is too short!');
  }

  users.byUsername(username, function(e, data) {
    if(e) {
      return done(e);
    }
    if(data) {
      return done('This username is already being used!');
    }
    return done();
  });
};

api.users.validate = function(request, response) {
  var validator = null;
  var param = null;

  if(request.param('username')) {
    param = request.param('username');
    validator = api.users._validateUsername;
  }

  if(validator === null) {
    winston.error('missing validator for type');
    return response.send(500);
  }

  validator(param, function(e) {
    if(e) {
      return response.send(e, 400);
    }
    return response.send('Perfect!', 200);
  });
};

api.users.create = function(request, response) {
  var hasErrors = false;
  var errors = {
      username: '',
      email : '',
      password : '',
      recaptcha : ''
  };

  api.users._validateUsername(request.body.username, function(e) {
    if(e) {
      errors.username = e;
      hasErrors = true;
    }

    response.errors = errors;
    return views.signup(request, response);

  });
};

module.exports = api;