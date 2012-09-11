var store = require('./store.js'),
    users = require('./users.js'),
    views = require('./views.js');

var api = { };

api.pivotal = { };

api.pivotal.projects = function(request, response) {
	response.send(404);
};

api.users = { };

api.users.available = function(request, response) {
  var name = request.param('name');
  if(name.length < 6) {
    return response.send('This username is too short!', 400);
  }
  users.byUsername(name, function(e, data) {
    if(e) {
      return response.send(500);
    }
    if(data) {
      return response.send('This username is already being used!', 400);
    }
    return response.send('Perfect!', 200);
  });
};

api.users.create = function(request, response) {
  var errors = {
      username: '',
      email : 'Invalid email',
      password : '',
      recaptcha : ''
    };

  return views.signupErrors(request, response, errors);
};

module.exports = api;