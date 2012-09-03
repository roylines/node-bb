
var store = require('./store.js');
var views = { };

views.home = function(request, response) {
  response.render('home', { title: 'home' });
};

module.exports = views;