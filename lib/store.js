var async = require('async'),
    mongodb = require('mongodb');

var store = { };

store.client = null;

store.configuration = function() {
  return {
    database: process.env.BB_MONGO_DATABASE || 'bb',
    host: process.env.BB_MONGO_HOST || 'localhost',
    port: parseInt(process.env.BB_MONGO_PORT || mongodb.Connection.DEFAULT_PORT, 10),
    user: process.env.BB_MONGO_USER,
    password: process.env.BB_MONGO_PASSWORD,
    serverOptions: {
      auto_reconnect: true,
      poolSize: 5,
      ssl: false
    }
  };
};

store.open = function(done) {
  var config = store.configuration();
  var db = new mongodb.Db(config.database, new mongodb.Server(config.host, config.port, config.serverOptions), {});
  db.open(function(e, d) {
    if(e) {
      return done(e);
    }
    db.authenticate(config.user, config.password, function(e, d) {
      if(e) {
        return done(e);
      }
      store.client = db;
      return done();
    });
  });
};

store.close = function() {
  if(store.client) {
    store.close();
  }
};

store.getCollection = function(name, done) {
  return store.client.collection(name, done);
};

module.exports = store;