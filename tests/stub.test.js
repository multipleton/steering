const mocha = require('mocha');
const assert = require('assert');

mocha.describe('stub test', () => {
  mocha.it('should pass', () => {
    assert.strictEqual(true, true);
  });
});
