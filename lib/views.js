var recaptcha = require('./recaptcha.js'),
    store = require('./store.js');

var views = { };

views.home = function(request, response) {
  response.render('home', { title: 'Bendy:Boards', description: 'Measure, Reflect, Improve' });
};

views.account = function(request, response) {
  response.render('account', { title: 'Manage Your Account', description: 'Manage Your Account' });
};

views.signup = function(request, response, errors) {
  response.render(
    'signup', {
    title: 'Register for Bendy:Boards',
    description: 'Create your personal account',
    recaptcha: recaptcha.publicKey(),
    errors: response.errors,
    values: request.body
  });
};

module.exports = views;