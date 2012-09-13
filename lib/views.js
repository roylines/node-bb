var recaptcha = require('./recaptcha.js'),
    store = require('./store.js');

var views = { };

views.home = function(request, response) {
  response.render('home', { title: 'BendyBoards' });
};

views.test = function(request, response) {
  response.render('home2', { title: 'BB' });
};

views.account = function(request, response) {
  response.render('account', { title: 'Manage Your Account' });
};

views.signup = function(request, response, errors) {
  response.render('signup', {
    title: 'Sign up BendyBoards',
    recaptcha: recaptcha.publicKey(),
    errors: response.errors,
    values: request.body
  });
};

module.exports = views;