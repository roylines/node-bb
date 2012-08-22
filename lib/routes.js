var api = require('./api.js'),
		views = require('./views.js');

var routes = { };

routes.bind = function(app) {
	routes.bindViews(app);
	routes.bindApi(app);
};

routes.bindViews = function(app) {
	app.get('/', views.home);
};

routes.bindApi = function(app) {
	app.get('/pivotal/projects/:token', api.pivotal.projects);
};

module.exports = routes;