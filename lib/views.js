var views = { };

views.home = function(request, response) {
	response.send('default view');
};

module.exports = views;