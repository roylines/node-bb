/*jshint es5:true*/

var api = require('./api.js'),
    express = require('express'),
    store = require('./store.js'),
		views = require('./views.js');

var routes = { };

routes.configure = function(app) {
  var root = __dirname + '/../';
  app.set('views', root + 'views');
  app.use(express.static(root + 'static'));
  app.use(express.bodyParser());
  // app.use(routes.store);
  app.set('view engine', 'ejs');

  routes.bindViews(app);
  routes.bindApi(app);
};

// routes.store = function (req, res, next) {
//   store.open(function(e, client) {
//     if(e) {
//       return response.send(e, 500);
//     }
//     res.locals.store = { client: client };
//     return next();
//   });
// };

routes.bindViews = function(app) {
	app.get('/', views.home);
  app.get('/signup', views.signup);
};

routes.bindApi = function(app) {
	app.get('/pivotal/projects/:token', api.pivotal.projects);
  app.post('/users/available', api.users.available);
  app.post('/users/create', api.users.create);
};

module.exports = routes;