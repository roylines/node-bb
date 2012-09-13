var store = require('./store.js'),
    users = require('./users.js'),
    views = require('./views.js');

var api = { };

api.pivotal = { };

api.pivotal.projects = function(request, response) {
	response.send(404);
};

api.users = { };
api.users.validate = { };

api.users.validate.field = function(request, response) {
  var validator = users.validate[request.params.field];
  var param = request.query.value;

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

  api.users.validate.username(request.body.username, function(e) {
    if(e) {
      errors.username = e;
      hasErrors = true;
    }
    api.users.validate.email(request.body.email, function(e) {
      if(e) {
        errors.email = e;
        hasErrors = true;
      }
      if(hasErrors) {
        response.errors = errors;
        return views.signup(request, response);
      } else {
        response.redirect('/account');
      }
    });
  });
};

module.exports = api;