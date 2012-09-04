var api = { };

api.pivotal = { };

api.pivotal.projects = function(request, response) {
	response.send(404);
};

api.users = { };

api.users.available = function(request, response) {
  var name = request.param('name');
  if(name.length == 4) {
    return response.send(200);
  }

  response.send(400);
};

module.exports = api;