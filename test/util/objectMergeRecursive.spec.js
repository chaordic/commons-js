import { expect } from 'chai';

import { objectMergeRecursive } from '../../src/util/objectMergeRecursive';

describe('objectMergeRecursive', function() {
  it('should merge the objects', function() {
    const mockObj1 = { a: 1, b: 2 };
    const mockObj2 = { c: 5, d: 6 };
    const expectedObj = { a: 1, b: 2, c: 5, d: 6 };
    
    expect(objectMergeRecursive(mockObj1, mockObj2)).to.deep.equal(expectedObj);
  });

  it('should overwrite the leftmost parameter if it conflicts with the next', function() {
    const mockObj1 = { a: 1, b: 2 };
    const mockObj2 = { b: 3, c: 4 };
    const mockObj3 = { c: 5, d: 6 };
    const expectedObj = { a: 1, b: 3, c: 5, d: 6 };

    expect(objectMergeRecursive(mockObj1, mockObj2, mockObj3)).to.deep.equal(expectedObj);
  });
  
  it('should not overwrite the leftmost parameter if the next is undefined', function() {
    const mockObj1 = { a: 1, b: 2 };
    const mockObj2 = { b: undefined, c: 4 };
    const expectedObj = { a: 1, b: 2, c: 4 };

    expect(objectMergeRecursive(mockObj1, mockObj2)).to.deep.equal(expectedObj);
  });

  it('should merge nested properties that are objects', function() {
    const mockObj1 = { a: 1, b: { c: 2, d: 3 } };
    const mockObj2 = { b: { c: 'some-string', d: { e: 0 } } };
    const mockObj3 = { f: { g: 4 } };
    const expectedObj = { a: 1, b: { c: 'some-string', d: { e: 0 } }, f: { g: 4 } };

    expect(objectMergeRecursive(mockObj1, mockObj2, mockObj3)).to.deep.equal(expectedObj);
  });

  it('should concat parameters that are both arrays', function() {
    const mockObj1 = [1,2,3];
    const mockObj2 = [4,5,6];
    const expectedObj = [1,2,3,4,5,6];

    expect(objectMergeRecursive(mockObj1, mockObj2)).to.deep.equal(expectedObj);
  });

  it('should overwrite array parameter if the next is an object', function() {
    const mockObj1 = [1];
    const mockObj2 = { a: 0 };
    const expectedObj = { a: 0 };

    expect(objectMergeRecursive(mockObj1, mockObj2)).to.deep.equal(expectedObj);
  });

});
