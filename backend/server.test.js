// http://stackoverflow.com/questions/8389149/how-do-you-mock-mysql-without-an-orm-in-node-js

var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai

describe('Simple test', function() {
  it('should not fail', function() {
    expect(true).to.equal(true);
  });
});