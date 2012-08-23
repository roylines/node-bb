var api = require('./api.js'),
		views = require('./views.js');

var routes = { };

routes.bind = function() {
	routes.bindViews();
	routes.bindApi();
};

routes.bindViews = function() {
	globals.app.get('/', views.home);
};

routes.bindApi = function() {
	globals.app.get('/pivotal/projects/:token', api.pivotal.projects);
};

module.exports = routes;