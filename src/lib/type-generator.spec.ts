import TypeGenerator from './type-generator';
import { expect } from 'chai';
import 'mocha';
/**
 * Dummy test
 */
describe("Basic JSON Types", () => {
  it("number", () => {
    expect(new TypeGenerator().magic('Test','{"a": 1}')).to.equal(
      'type Test = {\n  a: number\n}');
  });
  it("string", () => {
    expect(new TypeGenerator().magic('Test','{"a": "b"}')).to.equal(
      'type Test = {\n  a: string\n}');
  });
  it("boolean", () => {
    expect(new TypeGenerator().magic('Test','{"a": true}')).to.equal(
      'type Test = {\n  a: boolean\n}');
  });
  it("null", () => {
    expect(new TypeGenerator().magic('Test','{"a": null}')).to.equal(
      'type Test = {\n  a: null\n}');
  });
  it("null2", () => {
    expect(new TypeGenerator().magic('Test','{"a": undefined}')).to.equal(
      'type Test = {\n  a: null\n}');
  });
});

describe("Arrays", () => {
  it("String array", () => {
    expect(new TypeGenerator().magic('Test',
      '{"custom_audiences": ["a","b","c"]}')).to.equal(
      'type Test = {\n  custom_audiences: string[]\n}');
  });
});

describe("Objects", () => {
  it("object", () => {
    expect(new TypeGenerator().magic('Test',
      '{"custom_audiences": ["a","b","c"]}')).to.equal(
      'type Test = {\n  custom_audiences: string[]\n}');
  });
});

describe("Edge Cases", () => {
  it("just a empty object", () => {
    expect(new TypeGenerator().magic('Test','{}')).to.equal(
      'type Test = {\n}');
  });
  it("just a empty array", () => {
    expect(new TypeGenerator().magic('Test','[]')).to.equal(
      'type Test = [\n]');
  });

});

describe("Faulty stuff", () => {
  it("just a empty object", () => {
    expect(new TypeGenerator().magic('Test','{}')).to.equal(
      'type Test = {\n}');
  });
  it("just a empty array", () => {
    expect(new TypeGenerator().magic('Test','[]')).to.equal(
      'type Test = [\n]');
  });

});