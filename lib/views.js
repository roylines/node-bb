var recaptcha = require('./recaptcha.js'),
    store = require('./store.js');

var views = { };

views.home = function(request, response) {
  response.render('home', { title: 'BendyBoards' });
};

views.signup = function(request, response) {
  views.signupErrors(request, response);
};

views.signupErrors = function(request, response, errors) {
  if(!errors) {
    errors = {
      username: '',
      email : '',
      password : '',
      recaptcha : ''
    };
  }
  var viewData = {
    title: 'Sign up BendyBoards',
    recaptcha: recaptcha.publicKey(),
    errors: errors
  };

  response.render('signup', viewData);
};

module.exports = views;