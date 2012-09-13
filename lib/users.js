var async = require('async'),
    mongodb = require('mongodb'),
    store = require('./store.js');

var users = { };
users.validate = { };
users.find = { };

users.collection = function(done) {
  store.getCollection('users', done);
};

users.find.username = function(username, done) {
  users.collection(function(e, collection) {
    if(e) {
      return done(e);
    }

    collection.findOne({ _id: username }, done);
  });
};

users.create = function(user, done) {
  users.collection(function(e, collection) {
    if(e) {
      return done(e);
    }

    collection.insert(user, done);
  });
};

users.validate.username = function(username, done) {
  if(username.length < 6) {
    return done('This username is too short!');
  }

  users.find.username(username, function(e, data) {
    if(e) {
      return done(e);
    }
    if(data) {
      return done('This username is already being used!');
    }
    return done();
  });
};

users.validate.email = function(email, done) {
  if(email.length < 6) {
    return done('This email is too short!');
  }
  return done();
};

module.exports = users;