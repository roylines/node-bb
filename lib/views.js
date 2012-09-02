var views = { };

views.home = function(request, response) {
	response.render('home', { title: 'home', connection: process.env.BB_MONGO_HOST});
};

module.exports = views;