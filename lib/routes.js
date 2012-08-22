var routes = { };

routes.bind = function(app) {
	app.get('/', function(request, response) {
		response.send('Hello Again');
	});
};

module.exports = routes;