import TypeGenerator from './type-generator';
import { expect } from 'chai';
import 'mocha';
/**
 * Dummy test
 */
describe("Basic JSON Types", () => {
  it("number", () => {
    expect(new TypeGenerator().magic('Test','{"a": 1}')).to.equal(
      'type Test = {\n  a: number\n}\n');
  });
  it("string", () => {
    expect(new TypeGenerator().magic('Test','{"a": "b"}')).to.equal(
      'type Test = {\n  a: string\n}\n');
  });
  it("boolean", () => {
    expect(new TypeGenerator().magic('Test','{"a": true}')).to.equal(
      'type Test = {\n  a: boolean\n}\n');
  });
  it("null", () => {
    expect(new TypeGenerator().magic('Test','{"a": null}')).to.equal(
      'type Test = {\n  a: null\n}\n');
  });

});

describe("Arrays", () => {
  it("string array", () => {
    expect(new TypeGenerator().magic('Test',
      '{"custom_audiences": ["a","b","c"]}')).to.equal(
      'type Test = {\n  custom_audiences: string[]\n}\n');
  });
});

describe("Objects", () => {
  it("object with string array", () => {
    expect(new TypeGenerator().magic('Test',
      '{"custom_audiences": ["a","b","c"]}')).to.equal(
      'type Test = {\n  custom_audiences: string[]\n}\n');
  });
});

describe("Edge Cases", () => {
  it("empty name", () => {
    expect(new TypeGenerator().magic('','{"a": 1}')).to.equal(
      'type Thing = {\n  a: number\n}\n');
  });
  it("empty object", () => {
    expect(new TypeGenerator().magic('Test','{}')).to.equal(
      'type Test = {\n}\n');
  });
  it("empty array", () => {
    expect(new TypeGenerator().magic('Test','[]')).to.equal(
      'type Test = [\n]\n');
  });
});

describe("Faulty stuff", () => {
  it("Unexpected Token", () => {
    expect(new TypeGenerator().magic('Test','abc')).to.throw(
      'SyntaxError: Unexpected token u in JSON at position 0');
  });
  it("empty", () => {
    expect(new TypeGenerator().magic('Test','')).to.throw(
      'SyntaxError: Unexpected end of JSON input');
  });
});