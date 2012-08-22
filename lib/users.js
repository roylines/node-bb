var async = require('async'),
    mongodb = require('mongodb'),
    store = require('./store.js');

var users = { };

users.create = function(user, done) {
  store.create(user, 'users', done);
};

users.update = function(user, done) {
  store.update(user, 'users', done);
};

users.remove = function(user, done) {
  store.remove(user, 'users', done);
};

module.exports = users;