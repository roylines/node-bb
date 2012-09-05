var async = require('async'),
    mongodb = require('mongodb'),
    store = require('./store.js');

var users = { };

users.byUsername = function(store, username, done) {
  store.getCollection('users', function(e, collection) {
    if(e) {
      return done(e);
    }

    collection.findOne({ _id: username }, function(e, user) {
      return done(e, user);
    });
  });
};

module.exports = users;