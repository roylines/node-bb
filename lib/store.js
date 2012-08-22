var async = require('async'),
    mongodb = require('mongodb');

var store = { };

store.create = function(item, collection, done) {
  async.waterfall([
    store._open,
    function(client, callback) { client.collection(collection, callback); },
    function(c, callback) { c.insert(item, {safe:true}, callback); },
    function(docs, callback) { callback(null, docs[0]); }
    ], done);
};

store.update = function(item, collection, done) {
  return done('not implemented');
};

store.remove = function(item, collection, done) {
  return done('not implemented');
};

store._configuration = function() {
  return {
    database: process.env.BB_MONGO_DATABASE || 'bb',
    host: process.env.BB_MONGO_HOST || 'localhost',
    port: parseInt(process.env.BB_MONGO_PORT || mongodb.Connection.DEFAULT_PORT, 10),
    user: process.env.BB_MONGO_USER,
    password: process.env.BB_MONGO_PASSWORD
  };
};

store._open = function(callback) {
  var config = store._configuration();
  var db = new mongodb.Db(config.database, new mongodb.Server(config.host, config.port, { ssl: false}), {});
  db.open(function(e, d) {
    if(e) {
      return callback(e, d);
    }
    db.authenticate(config.user, config.password, function(e, d) {
      if(e) {
        return callback(e, d);
      }

      return callback(null, db);
    });
  });
};

module.exports = store;