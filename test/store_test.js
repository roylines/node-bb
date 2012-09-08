var assert = require('assert'),
		store = require('../lib/store.js');

describe('store', function() {
  describe('with a closed store', function() {
    it('calling getCollection should error', function(done) {
      store.getCollection('users', function(e) {
        assert(e);
        done(null);
      });
    });
    describe('calling open with valid configuration', function() {
      before(function(done) {
        this.timeout(20000);
        store.open(done);
      });
      after(function() {
        store.close();
      });
      it('should have a not null store client', function() {
        assert(store.client);
      });
      describe('calling getCollection', function() {
        var collection = null;
        before(function(done) {
          store.getCollection('x', function(e, c) {
            collection = c;
            done(e, c);
          });
        });
        it('should return a collection', function() {
          assert(collection);
        });
        it('should have a count of 0', function(done) {
          collection.count(function(e, cnt) {
            assert.equal(cnt, 0);
            done(e, cnt);
          });
        });
      });
    });
  });
});