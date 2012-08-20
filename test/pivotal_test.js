var assert = require('assert'),
	sinon = require('sinon'),
	pt = require('pivotal'),
	pivotal = require('../lib/pivotal.js');

describe('pivotal', function() {
	describe('a user with a token', function() {
		var user = null;
		before(function() {
			user = {
				tokens: {
					pivotal: 'TOKEN'
				}
			};
		});
		describe('and calling getProjects with valid token', function() {
			var data = null;
			before(function(done) {
				sinon.stub(pt, "getProjects");
				sinon.stub(pt, "useToken");
				pt.getProjects.yields(null, {
					project: [
					{ id: 'ID1', name: 'NAME1', other: 'OTHER1'},
					{ id: 'ID2', name: 'NAME2', other: 'OTHER2'}
				]});
				pivotal.getProjects(user, function(e, d) {
					data = d;
					done(e, d);
				});
			});
			after(function() {
				pt.getProjects.restore();
				pt.useToken.restore();
			});
			it('should set the token', function() {
				assert(pt.useToken.calledOnce);
				assert(pt.useToken.calledWith('TOKEN'));
			});
			it('should call into pivotal to get projects once', function() {
				assert(pt.getProjects.calledOnce);
			});
			it('should not return null', function() {
				assert(data);
			});
			it('should return 2 items', function() {
				assert.equal(data.length, 2);
			});
			it('should return first project', function() {
				assert.equal(data[0].id, 'ID1');
				assert.equal(data[0].name, 'NAME1');
				assert.equal(data[0].other, undefined);
			});
			it('should return second project', function() {
				assert.equal(data[1].id, 'ID2');
				assert.equal(data[1].name, 'NAME2');
				assert.equal(data[1].other, undefined);
			});
		});
	});
});