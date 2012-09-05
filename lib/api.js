var api = { };

api.pivotal = { };

api.pivotal.projects = function(request, response) {
	response.send(404);
};

api.users = { };

api.users.available = function(request, response) {
  var name = request.param('name');
  if(name.length < 6) {
    return response.send('This username is already being used!', 400);
  }

  if(name.length != 8) {
    return response.send('This username is already being used!', 400);
  }

  return response.send('Perfect!', 200);
};

module.exports = api;