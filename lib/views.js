var store = require('./store.js');
var views = { };

views.home = function(request, response) {
  store.getCollection('users', function(e, collection) {
    collection.count(function(e, cnt) {
      response.render('home', { title: 'home', cnt: cnt });
    });
  });
};

module.exports = views;