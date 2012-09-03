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
    password: process.env.BB_MONGO_PASSWORD
  };
};

store.open = function(done) {
  if(store.client) {
    return done(null);
  }

  var config = store.configuration();
  var db = new mongodb.Db(config.database, new mongodb.Server(config.host, config.port, { ssl: false}), {});
  db.open(function(e, d) {
    if(e) {
      return done(e);
    }
    db.authenticate(config.user, config.password, function(e, d) {
      if(e) {
        return done(e);
      }
      store.client = db;
      return done(null);
    });
  });
};

store.close = function() {
  if(store.client) {
    store.client.close();
    store.client = null;
  }
};

store.getCollection = function(name, done) {
  if(!store.client) {
    return done('store not opened');
  }

  return store.client.collection(name, done);
};

module.exports = store;