var recaptcha = require('./recaptcha.js'),
    store = require('./store.js');

var views = { };

views.home = function(request, response) {
  response.render('home', { title: 'Bendy:Boards', description: 'Measure, Reflect, Improve' });
};

views.account = function(request, response) {
  response.render('account', { title: 'Bendy:Boards', description: 'Manage Your Account' });
};

views.signup = function(request, response, errors) {
  response.render(
    'signup', {
    title: 'Bendy:Boards',
    description: 'Create your personal account',
    recaptcha: recaptcha.publicKey(),
    errors: response.errors,
    values: request.body
  });
};

module.exports = views;