import TypeGenerator from 'lib/TypeGenerator';
var assert = require('assert');
/**
 * Dummy test
 */
describe("Arrays", () => {
  it("String array", () => {
    assert.equal(new TypeGenerator().magic('Advertisers',
      '{"custom_audiences": ["1st","2nd","3th"]}'),
      'type Advertisers = {\n  custom_audiences: string[]\n}');
  })

  it("DummyClass is instantiable", () => {
    assert.equal([1, 2, 3].indexOf(4), -1);
  })
})