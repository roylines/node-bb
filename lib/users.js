var async = require('async'),
    mongodb = require('mongodb'),
    store = require('./store.js');

var users = { };

users.byUsername = function(username, done) {
  store.getCollection('users', function(e, collection) {
    if(e) {
      return done(e);
    }

    collection.findOne({ _id: username }, done);
  });
};

module.exports = users;