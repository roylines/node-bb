var views = { };

views.home = function(request, response) {
	response.render('home');
};

module.exports = views;