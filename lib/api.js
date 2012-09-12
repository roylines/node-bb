var store = require('./store.js'),
    users = require('./users.js'),
    views = require('./views.js');

var api = { };

api.pivotal = { };

api.pivotal.projects = function(request, response) {
	response.send(404);
};

api.users = { };

api.users._available = function(username, done) {
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

api.users.available = function(request, response) {
  var name = request.param('name');
  api.users._available(name, function(e) {
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

  api.users._available(request.body.username, function(e) {
    if(e) {
      errors.username = e;
      hasErrors = true;
    }

    response.errors = errors;
    return views.signup(request, response);

  });
};

module.exports = api;