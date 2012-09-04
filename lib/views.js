
var store = require('./store.js');
var views = { };

views.home = function(request, response) {
  response.render('home', { title: 'BendyBoards' });
};

views.signup = function(request, response) {
  response.render('signup', { title: 'Sign up BendyBoards' });
};

module.exports = views;