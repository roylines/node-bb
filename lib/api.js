var store = require('./store.js'),
    users = require('./users.js');

var api = { };

api.pivotal = { };

api.pivotal.projects = function(request, response) {
	response.send(404);
};

api.users = { };

api.users.available = function(request, response) {
  var name = request.param('name');
  if(name.length < 6) {
    return response.send('This username is too short!', 400);
  }

  store.open(function(e) {
    if(e) {
      return response.send(500);
    }
    users.byUsername(store, name, function(e, data) {
      if(e) {
        return response.send(500);
      }
      console.log(JSON.stringify(data));
      if(data) {
        return response.send('This username is already being used!', 400);
      }
      return response.send('Perfect!', 200);
    });
  });
};

module.exports = api;